import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/signup', form);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="club_admin">Club Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
        {form.role === 'club_admin' && (
          <input type="text" name="club_name" value={form.club_name} onChange={handleChange} placeholder="Name of the Club" required />
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
