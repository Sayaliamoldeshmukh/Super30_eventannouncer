import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set global axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    console.log('🔐 Trying login with:', email, password);

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('✅ Login response:', res.data);

      setUser(res.data.user); // Lift user state
      alert(res.data.message);
      navigate('/'); // Redirect to dashboard/home
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Server error.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-1">
          Welcome to Campus Events
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join your campus community and discover amazing events
        </p>

        {/* 🔁 Tab Switcher */}
        <div className="flex justify-center mb-6">
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-l-lg font-semibold text-black">
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:text-purple-600"
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                👁️
              </span>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
