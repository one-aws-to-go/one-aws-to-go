import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestHeaders } from 'axios';

import { useAlert } from '../hooks/useAlert';
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
  const [isLoading, setLoading] = useState<boolean>(false)

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.Authorization) {
      navigate('/home');
    }
  }, [cookies, navigate]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true)

      const response = await axios('api/user', {
        headers: authHeader(token),
      });

      const data = response.data;

      if (validateGithubUser(data)) {
        setCookie('Authorization', token);
        setLoading(false)
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
      setLoading(false)
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
                  className='flex flex-row w-72 items-center justify-center mt-2'
                  onSubmit={submitForm}
                >
                  <input
                    className='bg-primaryContainer w-96 appearance-none p-3 text-white focus:outline-none focus:shadow-outline'
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
                    {isLoading ?
                      (
                        <div role="status">
                          <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )
                      :
                      (
                        <svg
                          width='32'
                          height='24'
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
                      )
                    }

                  </button>
                </form>
                <a
                  className='text-center text-primary text-sm hover:text-primary/[.7]'
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

