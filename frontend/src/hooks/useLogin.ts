import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateGithubUser } from "../models/GithubUser";

export const useLogin = (token: string) => {
  const [, setCookie] = useCookies<string>(['Authorization']);

  const login = useQuery(["login"], async () => {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`

    const response = await axios('/api/user');

    if (validateGithubUser(response.data)) {
      toast.success('Authenticated succesfully!')
      setCookie('Authorization', token);
      return response.data
    }
    else {
      console.log(validateGithubUser.errors);
      toast.error('Unknown error occurred, please contact administrator [SCHEMA]')
    }
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