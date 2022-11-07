import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/NavBar/LogOut";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  let navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [cookies] = useCookies<string>(["Authorization"]);
  const { isFetching, refetch } = useLogin(token);

  // We want to always navigate to home page if there is a cookie available
  useEffect(() => {
    if (cookies.Authorization) {
      navigate("/home");
    }
  }, [cookies, navigate, token]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRedirect({ redirectUri: `${window.origin}/home` });
  };

  return (
    <div>
      <div className="bg-office bg-cover">
        <div className="flex flex-col h-screen backdrop-brightness-15 justify-center items-center">
          <p className="text-6xl text-center text-primary font-bold">OA2G</p>
          <p className="text-base text-center text-white font-semibold">
            "One AWS To Go"
          </p>
          <div>
            <div className="flex flex-row w-full justify-center">
              <div className="flex flex-col justify-start items-start space-y-1">
                <form
                  className="flex flex-row w-72 items-center justify-center mt-2"
                  onSubmit={submitForm}
                >
                  <button
                    type="submit"
                    className="text-white bg-primary/[.70] rounded focus:outline-none font-medium text-lg px-10 py-5 h-full  text-center inline-flex items-center hover:bg-primary/[.60]"
                  >
                    Login
                  </button>

                  <LogoutButton />
                </form>
                <a
                  className="text-center text-primary text-sm hover:text-primary/[.7]"
                  target="_blank"
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                  rel="noreferrer"
                >
                  Create a new token here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
