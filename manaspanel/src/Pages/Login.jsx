// src/Pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import doctorLogo from '../assets/logo1.png';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://drsomya.trecoarabia.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      login(data.token);
     
      console.log("mai chala tha");
      

      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#7fbe49] via-[#7fbe49;] to-[#b2dfdb]">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md mx-4 md:mx-0 border border-gray-200">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={doctorLogo} alt="Doctor Login" className="w-[20rem] h-24 object-cover" />
        </div>

        {/* <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center text-gray-800">
          Doctor Login
        </h2> */}
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 flex items-center mb-2">
              <FaUser className="mr-2 text-gray-400" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 transition"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 flex items-center mb-2">
              <FaLock className="mr-2 text-gray-400" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 transition"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className={`bg-teal-600 text-white px-4 py-3 rounded-md w-full hover:bg-teal-500 transition duration-200 ease-in-out flex items-center justify-center ${loading && 'opacity-50'}`}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12c0 1.57.39 3.04 1.07 4.29l2.66-2.66A6.978 6.978 0 0 1 4 12zm16 0c0-1.57-.39-3.04-1.07-4.29l-2.66 2.66A6.978 6.978 0 0 0 20 12zm-8-8c-1.57 0-3.04.39-4.29 1.07l2.66 2.66A6.978 6.978 0 0 1 12 4z" />
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Code Crafter Web Solutions
        </p>
      </div>
    </div>
  );
};

export default Login;
