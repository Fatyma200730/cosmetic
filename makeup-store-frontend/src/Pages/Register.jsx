import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register', { name, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-purple-700 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
