import { GithubAction } from "../models/Fork";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface GithubActionRequest {
  forkId: string | undefined,
  action: GithubAction
}

export const useGithubAction = () => {
  return useMutation({
    mutationFn: async (request: GithubActionRequest) => {
      await axios.post(`/api/forks/${request.forkId}/actions/${request.action.name}`);
      toast.success(`Action (${request.action.name}) executed succesfully!`)
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