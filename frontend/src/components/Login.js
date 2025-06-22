import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user);
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Server error.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-1">Welcome to Campus Events</h2>
        <p className="text-center text-gray-600 mb-6">Join your campus community and discover amazing events</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded">Sign In</button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
