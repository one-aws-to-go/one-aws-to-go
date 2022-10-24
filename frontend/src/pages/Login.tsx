import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestHeaders } from 'axios';

import { useAlert } from '../hooks/Alert';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { validateGithubUser } from '../models/GithubUser';

export const authHeader = (token: string): AxiosRequestHeaders => ({
  Authorization: `Bearer ${token}`,
});

const Login = () => {
  const [token, setToken] = useState<string>('');
  const [cookies, setCookie] = useCookies<string>(['Authorization']);
  const [alert, displayAlert] = useAlert();

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.Authorization) {
      navigate('/home');
    }
  }, [cookies, navigate]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios('api/user', {
        headers: authHeader(token),
      });

      const data = response.data;

      if (validateGithubUser(data)) {
        setCookie('Authorization', token);
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`
        navigate('/home');
      } else {
        console.log(validateGithubUser.errors);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        displayAlert(e.message)
      } else {
        console.log(`DEBUG: General error ${e}`);
      }
    }
  };

  return (
    <div>
      {alert && (
        <div
          className='absolute left-0 right-0 z-10 p-4 m-4 text-sm  text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
          role='alert'
        >
          <code>{alert}</code>
        </div>
      )}
      <div className='bg-office bg-cover'>
        <div className='flex flex-col h-screen backdrop-brightness-15 justify-center items-center'>
          <p className='text-6xl text-center text-primary font-bold'>OA2G</p>
          <p className='text-base text-center text-white font-semibold'>
            "One AWS To Go"
          </p>
          <div>
            <div className='flex flex-row w-full justify-center'>
              <div className='flex flex-col justify-start items-start space-y-1'>
                <form
                  className='flex flex-row w-56 items-center justify-center mt-2'
                  onSubmit={submitForm}
                >
                  <input
                    className='bg-black bg-opacity-50 shadow rounded-l border-2 appearance-none w-full px-3 py-2 h-full text-white focus:outline-none focus:shadow-outline placeholder:align-bottom'
                    id='token'
                    type='password'
                    placeholder='Token'
                    onChange={(event) => setToken(event.target.value)}
                    value={token}
                  />
                  <button
                    type='submit'
                    className='text-white bg-primary rounded-r focus:outline-none font-medium text-sm px-5 h-full  text-center inline-flex items-center hover:bg-primary/[.7]'
                  >
                    <svg
                      width='21'
                      height='18'
                      viewBox='0 0 21 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className=''
                    >
                      <path
                        d='M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </form>
                <a
                  className='text-center text-primary text-xs hover:text-primary/[.7]'
                  target='_blank'
                  href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
                  rel='noreferrer'
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
