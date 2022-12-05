import { Fork, validateFork } from "../models/Fork";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface CreateForkRequest {
  name: string,
  templateId: number,
}

export const useCreateFork = (provider: string) => {
  let navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (fork: CreateForkRequest) => {
      const response = await axios.post('/api/forks', fork);

      const createdFork = response.data

      if (validateFork(createdFork)) {
        navigate(`/set_secrets/${createdFork.id}`,
          {
            replace: true,
            state: {
              provider: provider
            }

          }
        )
        toast.success('Fork created succesfully!')

        // Add created fork to cache
        const oldForks = queryClient.getQueryData<Fork[]>(`forks`)
        if (oldForks) {
          queryClient.setQueryData(`forks`, [
            ...oldForks,
            createdFork
          ])
        }
      }
      else {
        toast.error(`Unknown error occurred [SCHEMA]`)
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        let data = error.response?.data
        if (validateErrorMessage(data)) {
          toast.error(data.message)
        }
        else {
          toast.error(`Unknown error occurred [${error.response?.status}]`)
        }
      }
    }
  });
}
/*
 enabled: false, retry: false,
    keepPreviousData: true,
    */