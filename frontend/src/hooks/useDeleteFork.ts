import { Fork, validateFork } from "../models/Fork";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { validateErrorMessage } from "../models/ErrorMessage";

export const useDeleteFork = (forkId: string | undefined) => {
  let navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/forks/${forkId}`);
      toast.success('Fork deleted succesfully!')
      navigate("/home")
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
    }
  });
}
/*
 enabled: false, retry: false,
    keepPreviousData: true,
    */