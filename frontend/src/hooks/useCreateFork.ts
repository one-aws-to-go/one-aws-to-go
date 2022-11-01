import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";

export interface CreateForkRequest {
  name: string,
  templateId: number,
}

export const useCreateFork = (fork: CreateForkRequest) => {
  let navigate = useNavigate()

  const createFork = useQuery(["createFork"], async () => {
    await axios.post('/api/forks', fork);
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
          toast.error('Unknown error occurred, please contact administrator [SCHEMA]')
        }
      }
    }
  });

  return createFork
}