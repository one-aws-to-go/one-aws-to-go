import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { validateErrorMessage } from "../models/ErrorMessage";
import { validateGithubUser } from "../models/GithubUser";

export const useLogin = (token: string) => {
  const [, setCookie] = useCookies<string>(['Authorization']);

  const login = useQuery(["login"], async () => {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`

    const response = await axios('api/user');

    if (validateGithubUser(response.data)) {
      toast.success('Authenticated succesfully!')
      setCookie('Authorization', token);
      return response.data
    } else {
      console.log(validateGithubUser.errors);
    }
  }, { enabled: false, retry: false });

  useEffect(() => {
    if (axios.isAxiosError(login.error)) {
      let data = login.error.response?.data
      if (validateErrorMessage(data)) {
        toast.error(data.message)
      }
    }
  }, [login.error])

  return login
}