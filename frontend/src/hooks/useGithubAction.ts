import { ExtendedFork, ForkState, GithubAction } from "../models/Fork";
import { useMutation, useQueryClient } from "react-query";

import axios from "axios";
import toast from "react-hot-toast";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface GithubActionRequest {
  forkId: string | undefined,
  action: GithubAction
}

const getForkStateFromAction = (action: GithubAction): ForkState => {
  switch (action.key) {
    case 'init':
      return ForkState.INITIALIZED
    case 'up':
      return ForkState.UP
    case 'down':
      return ForkState.DOWN
    default:
      return ForkState.INITIALIZED
  }
}

export const useGithubAction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: GithubActionRequest) => {
      await axios.post(`/api/forks/${request.forkId}/actions/${request.action.key}`);
      toast.success(`Action (${request.action.key}) executed succesfully!`)
    },
    onSuccess: (data, request) => {
      queryClient.refetchQueries(`forks/${request.forkId}/history`)
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
  })
}