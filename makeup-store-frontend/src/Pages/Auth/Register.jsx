import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/register', formData);
      alert("Inscription réussie !");
      navigate('/login');
    } catch (error) {
      setErrors(error.response?.data?.errors || { general: "Échec de l'inscription" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#af6768] mb-6 text-center">Inscription</h2>

        {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}

        {/* Nom */}
        <div className="mb-4">
          <label className="block text-[#242730] mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre nom"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[#242730] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        {/* Téléphone */}
        <div className="mb-4">
          <label className="block text-[#242730] mb-2">Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre numéro de téléphone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
        </div>

        {/* Adresse */}
        <div className="mb-4">
          <label className="block text-[#242730] mb-2">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre adresse"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
        </div>

        {/* Mot de passe */}
        <div className="mb-6">
          <label className="block text-[#242730] mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            placeholder="Entrez votre mot de passe"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        {/* Bouton d'inscription */}
        <button
          type="submit"
          className="w-full bg-[#af6768] text-white py-2 px-4 rounded-lg hover:bg-[#d88c8d] transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Inscription en cours...
            </>
          ) : (
            "S'inscrire"
          )}
        </button>

        <p className="text-center mt-4 text-[#242730]">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="text-[#af6768] hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
