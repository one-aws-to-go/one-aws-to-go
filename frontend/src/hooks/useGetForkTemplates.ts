import { validateForkTemplates, validateForks } from "../models/Fork";

import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";

export const useGetForkTemplates = () => {
  return useQuery(["forkTemplates"], async () => {
    const response = await axios.get('/api/templates');

    if (validateForkTemplates(response.data)) {
      return response.data
    }
    else {
      console.log(validateForks.errors);
      toast.error('Unknown error occurred, please contact administrator [SCHEMA]')
    }
  }, {
    refetchOnWindowFocus: false,
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