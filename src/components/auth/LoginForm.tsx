import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
import { authApi } from '../../api/authApi';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      const token = response.token;
      localStorage.setItem('jwtToken', token);
      showMessage('Login successful!', 'success');
      onSuccess?.();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      showMessage(err?.response?.data?.message || 'Login failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:border-blue-400 outline-none text-white"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:border-blue-400 outline-none text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-400 hover:bg-blue-500 transition-colors text-gray-900 font-semibold py-3 rounded-lg"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
