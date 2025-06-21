import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="relative bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-white">Campus Events</div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-indigo-200 font-medium">Home</Link>
            <Link to="/event" className="text-white hover:text-indigo-200 font-medium">Events</Link>
            <Link to="/club" className="text-white hover:text-indigo-200 font-medium">Clubs</Link>
            <Link to="/login" className="text-white hover:text-indigo-200 font-medium">Login</Link>
          </div>
          <button className="md:hidden text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
