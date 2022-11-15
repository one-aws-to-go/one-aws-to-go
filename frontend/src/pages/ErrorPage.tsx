import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-surface h-screen flex flex-col justify-center items-center'>
      <p className='text-6xl text-center text-primary font-bold'>OA2G</p>
      <p className='text-white p-2'>
        This page doesn't exist please go back!
      </p>
      <button
        className="btn-primary"
        onClick={() => { navigate('/home') }}
      >
        <div className="flex flex-row space-x-2 justify-center items-center">
          <ArrowLeftIcon className="w-5 h-5" />
          <div className="text-sm font-bold">Back</div>
        </div>
      </button>
    </div>
  )
}

/*
<button onClick={() => { navigate('/home') }} className="bg-primaryContainer hover:bg-primaryContainer/[.60] text-white  p-2 hover:text-primary col-span-1 rounded-md">
        <div className="flex flex-row space-x-2 justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <div className="text-sm font-bold">Back</div>
        </div>
      </button>
*/