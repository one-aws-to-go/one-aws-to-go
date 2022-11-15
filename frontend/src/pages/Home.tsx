import { Link, useNavigate } from 'react-router-dom';

import { LoaderIcon } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import NavBarWrapper from '../components/NavBarWrapper';
import { TemplateItem } from '../models/TemplateItem';
import { useGetForkTemplates } from '../hooks/useGetForkTemplates';
import { useGetForks } from '../hooks/useGetForks';
import { useQueries } from 'react-query';

const Main = () => {
  let navigate = useNavigate()

  const forks = useGetForks()
  const forkTemplates = useGetForkTemplates()

  return (
    <NavBarWrapper>
      <h1 className="pt-4 sm:text-xl text-lg font-bold text-primary">
        Templates
      </h1>

      {/* Template row */}
      <div className="flex flex-row overflow-x-auto">
        <div className="flex flex-row space-x-4 pb-2">
          {forkTemplates.data?.length === 0 && forkTemplates.isFetching || forkTemplates.isLoading ? (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )
            : forkTemplates.isError ? (
              <div className='text-white text-sm'>
                Error occurred, please try again
              </div>
            )
              : forkTemplates.data ? (
                forkTemplates.data.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="flex flex-col items-center justify-center w-32 h-32 sm:w-48 sm:h-48 max-w-xs overflow-hidden rounded-md shadow-md text-white hover:text-primary bg-primaryContainer transition-shadow duration-300 ease-in-out hover:bg-primaryContainer/[.60] cursor-pointer"
                      onClick={() => {
                        navigate(`/create_fork/${item.id}`, { state: { provider: item.provider } })
                      }}
                    >
                      <div className='relative flex flex-col p-2 w-full h-full justify-center'>
                        <img
                          className='absolute top-0 w-12 mt-2'
                          src={`../../assets/${item.provider}.png`}
                          alt={'logoImage'} />
                        <p className='absolute inset-y-0 right-0 mr-4 mt-2 text-xl'>{item.id}</p>
                        <div className='flex flex-col space-y-1'>
                          <p className='font-bold text-sm sm:text-lg'>{item.repo}</p>
                          <p className='text-xs hidden sm:block'>{item.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                }
                )
              ) : null
          }
        </div>
      </div>


      <h1 className="w-full sm:text-xl text-lg font-bold text-primary">
        Your own forks
      </h1>

      {/* Fork row */}
      <div className='flex flex-col space-y-2'>
        {forks.data?.length === 0 && forks.isFetching || forks.isLoading ? (
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )
          : forks.isError ? (
            <div className='text-white text-sm'>
              Error occurred, please try again
            </div>
          )
            : forks.data ? (
              forks.data.map((item, index) => {
                return (
                  <Link to={`/fork/${item.id}`} key={index}>
                    <div className='flex flex-row justify-between items-center shadow-md bg-primaryContainer w-full h-14 rounded-md hover:bg-primaryContainer/[.60] cursor-pointer text-white hover:text-primary'>
                      <div className='flex flex-col'>
                        <p className='ml-4 font-bold'>{item.appName} - {item.id}</p>
                      </div>
                      <img
                        className='h-10 px-2'
                        src={`../../assets/${item.provider}.png`}
                        alt={'logoImage'}
                      />
                    </div>
                  </Link>
                );
              }
              )
            ) : null
        }
      </div>
    </NavBarWrapper>
  )
};

export default Main;