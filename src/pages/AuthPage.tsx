import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-lg shadow-black/30"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-4 text-center text-gray-400">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 font-semibold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
