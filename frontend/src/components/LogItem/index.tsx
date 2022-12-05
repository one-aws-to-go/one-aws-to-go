import React, { FC, useState } from 'react';
import { formatDistance, formatDistanceToNow, formatDistanceToNowStrict, subDays } from 'date-fns';

import { ActionStepLog } from '../../models/RunData';
import Ansi from 'ansi-to-react';
import { ForkActionRun } from '../../models/ForkActionRun'
import { useNavigate } from 'react-router-dom';

export interface LogItemProps {
  item: ActionStepLog
}

const LogItem: FC<LogItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div className='flex flex-col bg-primaryContainer rounded-md'>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex flex-row mx-2 items-center justify-between text-white hover:text-primary hover:cursor-pointer'
      >
        <p className='text-start p-2'>{item.name}</p>
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        )}
      </div>
      {isExpanded && (
        <div className='overflow-x-auto px-2 pb-2'>
          <Ansi className='whitespace-pre text-xs text-white'>{item.data}</Ansi>
        </div>
      )}
    </div>
  );
};

export default LogItem;