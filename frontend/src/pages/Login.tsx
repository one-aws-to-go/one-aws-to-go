import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  let navigate = useNavigate();

  const submitForm = () => {
    navigate('/home')
  }

  return (
    <div className='h-screen bg-office bg-cover'>
      <div className='flex flex-col h-screen backdrop-brightness-15 justify-center items-center'>
        <p className='text-6xl text-center text-primary font-bold'>Awtq</p>
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
                  type='text'
                  placeholder='Token'
                />
                <button
                  type='submit'
                  className='text-white bg-primary rounded-r focus:outline-none font-medium text-sm px-5 h-full  text-center inline-flex items-center dark:bg-primary dark:hover:bg-orange-400'
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
                className='text-center text-primary text-xs'
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
  );
};

export default Login;
