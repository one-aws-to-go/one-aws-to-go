import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateForks } from "../models/Fork";
import { useAuth0 } from "@auth0/auth0-react";
import BackendService from "../services/BackendService";

export const useGetForks = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  return useQuery(["forks"], async () => {
    if (!user?.sub) {
      return
    }
    const accessToken = await getAccessTokenSilently({ audience: "lambda" });
    const forks = await new BackendService(accessToken).getForks();
    if (validateForks(forks)) {
      return forks;
    }
    else {
      console.error(validateForks.errors)
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
