import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';

import ActionHistoryItem from '../components/ActionHistoryItem';
import { GithubAction } from '../models/Fork';
import LogItem from '../components/LogItem';
import NavBar from '../components/NavBar';
import NavBarWrapper from '../components/NavBarWrapper';
import { useGetActionHistory } from '../hooks/useGetActionHistory';
import { useGetExtendedFork } from '../hooks/useGetExtendedFork';
import { useGetLogs } from '../hooks/useGetLogs';
import { useGithubAction } from '../hooks/useGithubAction';
import { useOutsideClick } from '../hooks/useOutsideClick';

const LogsPage = () => {
  const { forkId, runId } = useParams()
  const extendedFork = useGetExtendedFork(forkId)
  const navigate = useNavigate()
  const actionLogs = useGetLogs(forkId, runId)

  return (
    <NavBarWrapper>
      {actionLogs.isLoading || extendedFork.isLoading ? (
        <div role="status" className='flex flex-col h-full items-center justify-center'>
          <svg aria-hidden="true" className="w-8 h-8 text-primaryContainer animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        actionLogs.error || extendedFork.error ? (
          <div className='flex flex-col h-full items-center justify-center text-white text-sm'>
            Error occurred, please try again
          </div>
        ) : (
          actionLogs.data && extendedFork.data ? (
            <div className='flex flex-col py-2'>
              <div className='flex flex-row justify-between items-center pt-2'>
                <div className="text-xl font-bold text-primary">Logs</div>
                <a
                  target='_blank'
                  href={`https://github.com/${extendedFork.data.owner}/${extendedFork.data.appName}/actions/runs/${runId}`}
                  rel='noreferrer'
                  className="text-white">
                  <div className="flex flex-row space-x-2 justify-center items-center">
                    <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div className="text-sm font-bold">See in GitHub</div>
                  </div>
                </a>
              </div>
              <div className='space-y-2 pt-2'>
                {actionLogs.data.logFiles.map((item, index) => (
                  <LogItem item={item} key={index} />
                ))}
              </div>
            </div>
          ) : null
        )
      )}

    </NavBarWrapper>
  );
};

export default LogsPage;
