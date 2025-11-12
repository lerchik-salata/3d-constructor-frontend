import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface SnackbarProps {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000, type = 'info', onClose }) => {
  const [visible, setVisible] = useState<boolean>(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor = clsx(
    'px-6 py-3 rounded-xl shadow-lg text-white font-medium max-w-md w-auto mx-auto transition-opacity duration-300',
    type === 'success' && 'bg-green-500',
    type === 'error' && 'bg-red-500',
    type === 'info' && 'bg-gray-600'
  );

  return (
    <div
      className={`${bgColor} fixed top-6 left-1/2 -translate-x-1/2`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {message}
    </div>
  );
};

export default Snackbar;

