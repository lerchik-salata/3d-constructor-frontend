import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
import { authApi } from '../../api/authApi';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.register(email, password);
      showMessage('Registration successful! You can now login.', 'success');
      onSuccess?.();
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      showMessage(err?.response?.data?.message || 'Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
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
      <div>
        <label className="block text-gray-300 mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:border-blue-400 outline-none text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-400 hover:bg-green-500 transition-colors text-gray-900 font-semibold py-3 rounded-lg"
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
