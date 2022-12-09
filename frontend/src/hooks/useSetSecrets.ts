import { ForkAwsSecretArgs } from "../models/ForkAwsSecretArgs";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { useAuth0 } from "@auth0/auth0-react";
import BackendService from "../services/BackendService";

export const useSetSecrets = (id: string | undefined, secrets: ForkAwsSecretArgs) => {
  let navigate = useNavigate()

  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const login = useQuery(["secrets"], async () => {
    if (!user?.sub) {
      return
    }
    const accessToken = await getAccessTokenSilently({ audience: "lambda" });
    await new BackendService(accessToken).setSecrets(String(id), secrets);

    toast.success('Secrets updated succesfully!')
    navigate(`/details/${id}`)
  }, {
    enabled: false,
    retry: false,
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

  return login
}
