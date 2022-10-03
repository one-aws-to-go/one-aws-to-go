import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();

  return (
    <div className='h-screen bg-office bg-cover'>
      <div className='flex flex-col h-screen backdrop-brightness-15 justify-center items-center'>
        <p className='text-5xl text-center text-primary font-bold'>Awtq</p>
        <p className='text-base text-center text-white font-bold'>
          "One AWS To Go"
        </p>
        <div>
          <div className='flex flex-row w-full justify-center'>
            <div className='flex flex-col justify-start items-start space-y-1'>
              <div className='flex flex-row w-56 items-center justify-center mt-2'>
                <input
                  className='bg-black bg-opacity-50 shadow appearance-none w-full px-3 py-2 h-full text-white focus:outline-none focus:shadow-outline placeholder:align-top leading-none'
                  id='username'
                  type='text'
                  placeholder='Token'
                />
                <button
                  onClick={() => navigate('/main')}
                  type='button'
                  className='text-white bg-primary focus:outline-none font-medium text-sm px-5 h-full  text-center inline-flex items-center dark:bg-primary dark:hover:bg-orange-400'
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
              </div>
              <a
                className='text-center text-primary text-xs'
                target='_blank'
                href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
                rel='noreferrer'
              >
                Create new token here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
