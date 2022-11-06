import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateForks } from "../models/Fork";

export const useGetForks = () => {
  return useQuery(["forks"], async () => {
    const response = await axios.get('/api/forks');

    if (validateForks(response.data)) {
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