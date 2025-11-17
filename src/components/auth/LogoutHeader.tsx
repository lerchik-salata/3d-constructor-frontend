import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authApi } from '../../api/authApi';
import { User } from 'lucide-react';
import type { User as UserType } from '../../types/user';

export const LogoutHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserType | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const fetchUserData = async () => {
    const data = await authApi.getMe();
    setUser(data);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-gray-900 shadow">
        <div className="flex items-center space-x-2 text-white">
            <User className="w-5 h-5" />
            <span className="font-medium">{user?.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
          >
            Home
          </button>
          {user?.role === 'Admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Admin Panel
            </button>
          )}
          <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};
