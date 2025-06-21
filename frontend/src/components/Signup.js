import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    role: '',
    club_name: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ This line was missing


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await axios.post("/api/auth/signup", form, {
  withCredentials: true
});

    alert(res.data.message);
    // Redirect to login page after successful signup
    navigate('/login');
  } catch (err) {
    setError(err.response?.data?.message || 'Signup failed');
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">Create Account</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

      <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded"
  required
>
  <option value="">Select Role</option>
  <option value="student">Student</option>
  <option value="club_admin">Club Admin</option>
  <option value="super_admin">Super Admin</option>
</select>

{form.role === 'club_admin' && (
  <input
    type="text"
    name="club_name"
    value={form.club_name}
    onChange={handleChange}
    placeholder="Name of the Club"
    className="w-full p-2 border border-gray-300 rounded"
    required
  />
)}


        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
