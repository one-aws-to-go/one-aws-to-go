import { RunData, validateRunData } from "../models/RunData";

import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateForkActionsHistory } from "../models/ForkActionRun";

export const useGetLogs = (forkId: string | undefined, runId: string | undefined) => {
  return useQuery([`forks/${forkId}/history/${runId}`], async () => {
    const response = await axios.get(`/api/forks/${forkId}/history/${runId}`);

    if (validateRunData(response.data)) {
      return response.data
    }
    else {
      console.log(validateRunData.errors);
      toast.error('Unknown error occurred, please contact administrator [SCHEMA]')
    }
  }, {
    refetchOnWindowFocus: false,
    /* refetchInterval: (data) => {
      // Poll action history until there are no running actions
      if (data?.some(action => action.running === true)) {
        return 10000
      }
      return false
    }, */
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