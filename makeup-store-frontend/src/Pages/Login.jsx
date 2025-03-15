import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      
      // ✅ Stocker le token en localStorage (ou HttpOnly cookies côté serveur)
      localStorage.setItem('token', response.data.token);

      // ✅ Redirection vers le tableau de bord
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      console.log(error.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 flex justify-center"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Login'}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="/register" className="text-purple-700 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
