import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateExtendedFork } from "../models/Fork";
import BackendService from "../services/BackendService";

export const useGetExtendedFork = (id: string | undefined) => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  return useQuery(["extendedFork"], async () => {
    if (!user?.sub) {
      return
    }
    const accessToken = await getAccessTokenSilently({ audience: "lambda" });
    if (!id) {
      console.warn("Empty id for useGetExtendedFork")
      return
    }
    const fork = await new BackendService(accessToken).getExtendedFork(id);
    if (validateExtendedFork(fork)) {
      return fork
    }
    else {
      console.log(validateExtendedFork.errors);
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
