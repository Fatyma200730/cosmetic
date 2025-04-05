import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/slices/authSlice";
import { FaSpinner } from 'react-icons/fa'; // Import de l'icône de chargement

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      dispatch(setToken({ token: response.data.token }));
      dispatch(setUser({ user: response.data.user }));

      alert("Connexion réussie");

      console.log("Connexion réussie ! Envoi du panier...");
      
      saveCartToDB();
      // Rediriger après MAJ de Redux
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#af6768] mb-6 text-center">Connexion</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-[#242730] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#242730] mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#af6768] text-white py-2 px-4 rounded-lg hover:bg-[#d88c8d] transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> {/* Icône de chargement avec animation */}
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </button>

        <p className="text-center mt-4 text-[#242730]">
          Vous n'avez pas de compte ?{' '}
          <a href="/register" className="text-[#af6768] hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;