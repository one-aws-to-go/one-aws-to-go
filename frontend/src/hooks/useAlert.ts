import { useEffect, useState } from 'react';

interface AlertState {
  message: string
  success: boolean
}

export const useAlert = (initialState = '') => {
  const [alert, setAlert] = useState<AlertState>({
    message: initialState,
    success: false
  });

  const displayAlert = (message: string, success: boolean = false) => {
    setAlert({ message, success })
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: '', success: false })
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return [alert, displayAlert] as const
};
