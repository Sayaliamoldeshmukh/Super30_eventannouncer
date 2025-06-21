// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    user && (
      <header className="bg-white text-purple-700 p-4 flex justify-between items-center shadow shadow-purple-200">
        <span>
          Welcome <strong>{user.name}</strong>! Logged in as <strong>{user.role}</strong>
        </span>
        <button
          onClick={handleLogout}
          className="bg-white border border-purple-500 text-purple-700 px-4 py-2 rounded hover:bg-purple-100 transition"
        >
          Logout
        </button>
      </header>
    )
  );
}
