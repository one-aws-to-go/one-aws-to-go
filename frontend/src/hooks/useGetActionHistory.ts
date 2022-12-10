import { useQuery, useQueryClient } from "react-query";

import axios from "axios";
import toast from "react-hot-toast";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateExtendedFork } from "../models/Fork";
import { validateForkActionsHistory } from "../models/ForkActionRun";

export const useGetActionHistory = (id: string | undefined) => {
  const queryClient = useQueryClient()
  let requireStateUpdate = false

  return useQuery(
    {
      queryKey: [`forks/${id}/history`],
      queryFn: async () => {
        const response = await axios.get(`/api/forks/${id}/history`);

        if (validateForkActionsHistory(response.data)) {
          // After polling stops, we must refetch fork details once to get updated state
          if (response.data?.every(action => action.running === false) && requireStateUpdate) {
            queryClient.refetchQueries(`forks/${id}`)
            requireStateUpdate = false
          }
          return response.data
        }
        else {
          console.log(validateForkActionsHistory.errors);
          toast.error('Unknown error occurred, please contact administrator [SCHEMA]')
        }
      },
      refetchOnWindowFocus: false,
      refetchInterval: (data) => {
        // Poll action history until there are no running actions
        if (data?.some(action => action.running === true)) {
          requireStateUpdate = true
          return 10000
        }

        return false
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
    }
  );
}