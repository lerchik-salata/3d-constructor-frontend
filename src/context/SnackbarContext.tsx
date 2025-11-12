import React, { createContext, useContext, useState } from 'react';
import Snackbar from '../components/common/SnackBar';

interface SnackbarContextType {
  showMessage: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [duration, setDuration] = useState(3000);

  const showMessage = (msg: string, t: 'success' | 'error' | 'info' = 'info', d: number = 3000) => {
    setMessage(msg);
    setType(t);
    setDuration(d);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar 
        message={message} 
        type={type} 
        duration={duration} 
        onClose={() => setMessage('')} 
      />
    </SnackbarContext.Provider>
  );
};
