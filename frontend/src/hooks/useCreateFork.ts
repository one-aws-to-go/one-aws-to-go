import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { useAuth0 } from "@auth0/auth0-react";
import BackendService from "../services/BackendService";

export interface CreateForkRequest {
  name: string,
  templateId: number,
}

export const useCreateFork = (fork: CreateForkRequest) => {
  let navigate = useNavigate()
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const createFork = useQuery(["createFork"], async () => {
    if (!user?.sub) {
      console.error("Empty user sub in useCreateFork");
      return
    }
    const accessToken = await getAccessTokenSilently({ audience: "lambda" });
    await new BackendService(accessToken).createFork(fork);
    navigate(`/set_secrets/1`, { replace: true })
    toast.success('Fork created succesfully!')

  }, {
    enabled: false, retry: false,
    keepPreviousData: true,
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

  return createFork
}
