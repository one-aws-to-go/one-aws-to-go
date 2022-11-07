import { Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [cookies] = useCookies<string>(["Authorization"]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  console.log(user);

  return children;
};
