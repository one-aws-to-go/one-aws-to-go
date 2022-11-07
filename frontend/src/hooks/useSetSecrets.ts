import { ForkAwsSecretArgs } from "../models/ForkAwsSecretArgs";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";

export const useSetSecrets = (id: string | undefined, secrets: ForkAwsSecretArgs) => {
  let navigate = useNavigate()
  
  const login = useQuery(["secrets"], async () => {
    await axios.put(`/api/forks/${id}/secrets`, secrets);
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