import { Link, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { TemplateItem } from '../models/TemplateItem';
import aws from '../assets/aws.png'
import azure from '../assets/azure.png'
import gcp from '../assets/gcp.png'
import { useGetForks } from '../hooks/useGetForks';

const Main = () => {
  const { data, isError, isFetching, isLoading } = useGetForks()
  let navigate = useNavigate()

  let templateItems: TemplateItem[] = [
    {
      img: aws,
      title: 'AWS',
      disabled: false,
    },
    {
      img: gcp,
      title: 'GCP',
      disabled: true,
    },
    {
      img: azure,
      title: 'Azure',
      disabled: true,
    },
  ];

  console.log(data?.length)

  return (
    <div className='flex flex-col bg-surface h-screen'>
      <NavBar />
      <div className="flex flex-col space-y-2 mx-auto max-w-7xl w-full">
        <h1 className="w-full px-6 pt-4 sm:text-xl text-lg font-bold max-w-7xl mx-auto text-primary">
          Template
        </h1>

        <div className="flex flex-row mx-6 overflow-x-auto scroll-py-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-primaryContainer">
          <div className="flex flex-row space-x-4 pb-4">
            {
              templateItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center w-32 h-32 sm:w-48 sm:h-48 max-w-xs overflow-hidden rounded-lg shadow-md text-white bg-primaryContainer transition-shadow duration-300 ease-in-out hover:bg-primaryContainer/[.60] cursor-pointer"
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.title === 'AWS') {
                        navigate('/create_fork')
                      }
                    }}
                  >
                    <img
                      className='p-4'
                      src={item.img}
                      alt={'logoImage'} />
                  </button>
                );
              })
            }
          </div>
        </div>


        <h1 className="w-full px-6 pt-4 sm:text-xl text-lg font-bold max-w-7xl mx-auto text-primary">
          Your own forks
        </h1>
        <div className="px-6">
          <div className='space-y-2'>
            {data?.length === 0 && isFetching || isLoading ? (
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )
              : isError ? (
                <div className='text-white text-sm'>
                  Error occurred, please try again
                </div>
              )
                : data ? (
                  data.map((item, index) => {
                    return (
                      <Link to={'/details/' + item.id} key={index}>
                        <div className='flex flex-row justify-between items-center shadow-md bg-primaryContainer w-full h-14 rounded-lg hover:bg-primaryContainer/[.60] cursor-pointer text-white hover:text-primary'>
                          <div className='flex flex-col'>
                            <p className='ml-4 font-bold'>{item.appName} - {item.id}</p>
                          </div>
                          <img
                            className='h-10 px-2'
                            src={aws}
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
        </div>
      </div>
    </div>
  )
};

export default Main;