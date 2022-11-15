import React, { useState } from 'react';

import ActionHistoryItem from '../components/ActionHistoryItem';
import { GithubAction } from '../models/Fork';
import NavBar from '../components/NavBar';
import NavBarWrapper from '../components/NavBarWrapper';
import { useGetActionHistory } from '../hooks/useGetActionHistory';
import { useGetExtendedFork } from '../hooks/useGetExtendedFork';
import { useGithubAction } from '../hooks/useGithubAction';
import { useParams } from 'react-router-dom';

const ActionPage = () => {
  const { id } = useParams()
  const actionHistory = useGetActionHistory(id)
  const extendedFork = useGetExtendedFork(id)
  const mutation = useGithubAction()

  const handleActionButtonClicked = (action: GithubAction) => {
    mutation.mutate({
      forkId: id,
      action: action
    })
  }

  return (
    <NavBarWrapper>
      <div className="flex flex-col mx-6 pt-2 pb-2 space-y-2 bg-surface">

        <div className='flex flex-row items-center space-x-3 h-full'>
          <div className="text-xl font-bold text-primary">Execute actions</div>
          {mutation.isLoading && (
            <div role="status">
              <svg aria-hidden="true" className="w-6 h-6 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        {/* Button row */}
        {extendedFork.isLoading ? (
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : extendedFork.error ? (
          <div className='text-white text-sm'>
            Error occurred, please try again
          </div>
        ) : (
          extendedFork.data ? (
            <div className='flex flex-row space-x-2'>
              {extendedFork.data.actions.map((item, index) => (
                <button disabled={mutation.isLoading} key={index} onClick={() => handleActionButtonClicked(item)} className="flex flex-col bg-primaryContainer hover:bg-primaryContainer/[.60] text-white  p-2 hover:text-primary rounded-md">
                  <p className='font-bold'>{item.name}</p>
                </button>
              ))
              }
            </div>
          ) : null
        )}

        <div className="text-xl font-bold text-primary">Action history</div>

        {/* Action history */}
        <div className='flex flex-col space-y-2 0'>
          {actionHistory.isLoading ? (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : actionHistory.error ? (
            <div className='text-white text-sm'>
              Error occurred, please try again
            </div>
          ) : (
            actionHistory.data ? (
              actionHistory.data.map((item, index) => (
                <ActionHistoryItem key={index} item={item} />
              ))
            ) : null)}
        </div>

      </div>
    </NavBarWrapper>
  );
};

export default ActionPage;