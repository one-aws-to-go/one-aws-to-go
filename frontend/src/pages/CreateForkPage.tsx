import { useLocation, useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { useCreateFork } from '../hooks/useCreateFork';
import { useState } from 'react';
import { validateExtendedFork } from '../models/Fork';

export interface CreateForkPageProps {
    provider: string
}

const CreateForkPage = () => {
    const { id } = useParams()
    const { provider } = useLocation().state as CreateForkPageProps

    const [forkName, setForkName] = useState<string>('')
    const mutation = useCreateFork(provider)

    const onForkClicked = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            mutation.mutate({
                name: forkName,
                templateId: parseInt(id)
            })
        }
    }

    return (
        <div className='w-screen h-screen bg-repeat bg-surface flex flex-col '>
            <NavBar />
            <form
                onSubmit={onForkClicked}
                className='flex flex-1 flex-col items-center justify-center'>
                <div className='flex items-center'>
                    <img className='w-32' src={`../../assets/${provider}.png`} />
                    <p className='text-primary font-bold'>Create a project</p>
                </div>
                <div>
                    <p className='text-white mb-1 font-semibold'>Project name (*)</p>
                    <input
                        className='block w-full bg-primaryContainer text-white focus:border-primary focus:ring-0 placeholder:text-sm'
                        id="project name"
                        type="text"
                        placeholder="Your fork name"
                        onChange={(event) => setForkName(event.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <button className="bg-primaryContainer hover:bg-primaryContainer/[.60] text-white p-2 hover:text-primary rounded-lg">
                        <div className="flex flex-row space-x-2 justify-center items-center">
                            {mutation.isLoading ? (
                                <div role="status">
                                    <svg aria-hidden="true" className="w-6 h-6 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <svg className='w-6 h-6' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 29C17.933 29 19.5 27.433 19.5 25.5C19.5 23.567 17.933 22 16 22C14.067 22 12.5 23.567 12.5 25.5C12.5 27.433 14.067 29 16 29Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 11C10.933 11 12.5 9.433 12.5 7.5C12.5 5.567 10.933 4 9 4C7.067 4 5.5 5.567 5.5 7.5C5.5 9.433 7.067 11 9 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M23 11C24.933 11 26.5 9.433 26.5 7.5C26.5 5.567 24.933 4 23 4C21.067 4 19.5 5.567 19.5 7.5C19.5 9.433 21.067 11 23 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 18V21M9.5 12C9.5 19 22.5 19 22.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}

                            <div className="text-sm font-bold">Create a fork</div>
                        </div>
                    </button>
                </div>
            </form >
        </div >
    );
};

export default CreateForkPage;
