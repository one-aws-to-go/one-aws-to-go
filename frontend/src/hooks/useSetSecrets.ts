import { useMutation, useQuery, useQueryClient } from "react-query";

import { ExtendedFork } from "../models/Fork";
import { ForkAwsSecretArgs } from "../models/ForkAwsSecretArgs";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface SetSecretsRequest {
  forkId: string | undefined,
  secrets: ForkAwsSecretArgs
}

export const useSetSecrets = () => {
  let navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: SetSecretsRequest) => {
      await axios.put(`/api/forks/${request.forkId}/secrets`, request.secrets);
      toast.success('Secrets updated succesfully!')
      navigate(`/details/${request.forkId}`)

      // Update secrets value to cache
      queryClient.setQueryData<ExtendedFork | undefined>(`extendedFork/${request.forkId}`, (oldFork: ExtendedFork | undefined) => oldFork && {
        ...oldFork,
        secretsSet: true
      })
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
      else {
        toast.error('Unknown error occurred, please contact administrator [UNKNOWN]')
      }
    }
  });
}