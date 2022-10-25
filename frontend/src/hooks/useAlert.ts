import { useEffect, useState } from 'react';

export const useAlert = (initialState = '') => {
  const [alert, setAlert] = useState<string>(initialState);

  const displayAlert = (message: string) => setAlert(message)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return [alert, displayAlert] as const
};
