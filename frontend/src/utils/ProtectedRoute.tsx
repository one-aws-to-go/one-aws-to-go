import { Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [cookies,] = useCookies<string>(['Authorization']);

  if (!cookies.Authorization) {
    return <Navigate to="/" />
  }
  else {
    axios.defaults.headers.common['Authorization'] = `bearer ${cookies.Authorization}`
  }

  return children
};