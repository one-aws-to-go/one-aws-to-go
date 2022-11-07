import { Fork, validateFork } from "../models/Fork";
import { useMutation, useQueryClient } from "react-query";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface CreateForkRequest {
  name: string,
  templateId: number,
}

export const useCreateFork = () => {
  let navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (fork: CreateForkRequest) => {
      const response = await axios.post('/api/forks', fork);

      const createdFork = response.data

      if (validateFork(createdFork)) {
        navigate(`/set_secrets/1`, { replace: true })
        toast.success('Fork created succesfully!')

        // Add created fork to cache
        queryClient.setQueryData<Fork[] | undefined>('forks', (oldForks: Fork[] | undefined) => oldForks && [
          ...oldForks,
          createdFork
        ])
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