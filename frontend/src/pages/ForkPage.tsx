import { CheckBadgeIcon, CheckCircleIcon, ExclamationCircleIcon, StopCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ActionHistoryItem from '../components/ActionHistoryItem';
import { ErrorIcon } from 'react-hot-toast';
import { GithubAction } from '../models/Fork';
import NavBar from '../components/NavBar';
import NavBarWrapper from '../components/NavBarWrapper';
import { useGetActionHistory } from '../hooks/useGetActionHistory';
import { useGetExtendedFork } from '../hooks/useGetExtendedFork';
import { useGithubAction } from '../hooks/useGithubAction';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ForkPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const actionHistory = useGetActionHistory(id)
  const extendedFork = useGetExtendedFork(id)
  const mutation = useGithubAction()

  const ref = useRef(null)
  const [areActionsVisible, setActionsVisible] = useState(false)

  useOutsideClick(ref, () => {
    setActionsVisible(false)
  })

  const handleActionButtonClicked = (action: GithubAction) => {
    setActionsVisible(!areActionsVisible)
    mutation.mutate({
      forkId: id,
      action: action
    })
  }


  return (
    <NavBarWrapper>
      {extendedFork.isLoading || actionHistory.isLoading ? (
        <div role="status" className='flex flex-col h-full items-center justify-center'>
          <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        extendedFork.error || actionHistory.isError ? (
          <div className='flex flex-col h-full items-center justify-center text-white text-sm'>
            Error occurred, please try again
          </div>
        ) : (
          extendedFork.data && actionHistory.data ? (
            <>
              <div className="text-3xl font-bold text-primary pt-2">{extendedFork.data.appName.toLocaleUpperCase()}</div>
              <div className="text-xl font-bold text-primary">Details</div>

              <div className='flex flex-row flex-wrap items-center text-white gap-2 h-96'>
                <div className='flex flex-col border border-primaryContainer  flex-none items-center justify-center rounded-md p-4 h-20'>
                  <p className='font-bold'>Status</p>
                  <p>{extendedFork.data.state.toUpperCase()}</p>
                </div>
                <div className='flex flex-col border border-primaryContainer  flex-none items-center justify-center rounded-md p-4 h-20'>
                  <p className='font-bold'>Secrets</p>
                  {extendedFork.data.secretsSet ? (
                    <CheckBadgeIcon className='w-8 h-8 text-success' />
                  ) : (
                    <ExclamationCircleIcon className='w-8 h-8 text-error' />
                  )}
                </div>
                <div className='flex flex-col border border-primaryContainer  flex-none items-center justify-center rounded-md p-4 h-20'>
                  <p className='font-bold'>Provider</p>
                  <img
                    className='h-8 object-scale-down'
                    src={`../../assets/${extendedFork.data.provider}.png`}
                    alt={'logoImage'}
                  />
                </div>
              </div>

              <div className='flex flex-row flex-wrap gap-2'>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (extendedFork.data) {
                      navigate(`/set_secrets/${extendedFork.data.id}`,
                        {
                          state: {
                            provider: extendedFork.data.provider
                          }
                        }
                      )
                    }
                  }}
                >
                  <div className="flex flex-row space-x-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white">
                      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-bold">Secrets</div>
                  </div>
                </button>

                <a
                  target='_blank'
                  href={`https://github.com/${extendedFork.data.owner}/${extendedFork.data.appName}`}
                  rel='noreferrer'
                  className="a-primary justify-center items-center">
                  <div className="flex flex-row space-x-2 justify-center items-center">
                    <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div className="text-sm font-bold">GitHub</div>
                  </div>
                </a>
              </div>

              <div className='relative flex flex-row justify-between items-center'>
                <div className="text-xl font-bold text-primary">Action history</div>

                <div ref={ref}>
                  <button
                    disabled={mutation.isLoading}
                    onClick={() => {
                      setActionsVisible(!areActionsVisible)
                    }}
                    className="btn-primary">
                    <div className="flex flex-row space-x-2 justify-center items-center">
                      <div className="text-sm font-bold">Actions</div>
                      {mutation.isLoading ? (
                        <div role="status">
                          <svg aria-hidden="true" className="w-5 h-5 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>

                <div id="dropdownDivider" className={`absolute z-10 right-0 top-10 rounded divide-y divide-gray-500 shadow bg-dropdown  ${!areActionsVisible && 'hidden'} `}>
                  <ul className="py-1 text-sm text-gray-200">
                    {extendedFork.data.actions.map((action) =>
                      <li key={action.key}>
                        <button onClick={() => handleActionButtonClicked(action)}
                          className="block py-2 px-4 w-full text-start hover:bg-primaryContainer/[.60] text-white hover:text-primary"
                        >
                          {action.name}
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action history items */}
              <div className='space-y-2 pb-2'>
                {actionHistory.data.map((item, index) => (
                  <ActionHistoryItem key={index} item={item} />
                ))}
              </div>
            </>
          ) : null
        )
      )}

    </NavBarWrapper>
  );
};

export default ForkPage;