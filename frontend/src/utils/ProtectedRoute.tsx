import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [cookies,] = useCookies<string>(['Authorization']);

  if (!cookies.Authorization) {
    return <Navigate to="/" />
  }

  return children
};