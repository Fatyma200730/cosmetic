import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaMapMarkerAlt, FaPhone, FaLock, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [token, setToken] = useState(localStorage.getItem('token'));  // Récupérer le token depuis le localStorage
  console.log(profileImage)
  useEffect(() => {
    // Récupérer les informations de l'utilisateur après la connexion
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,  // Ajouter le token à l'entête Authorization
          },
        });
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone(response.data.phone || '');
        setProfileImage(response.data.profile_image || 'https://via.placeholder.com/150');  // Utiliser l'image par défaut si non définie
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:8000/api/profile',
        { name, email, address, phone, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Ajouter le token à l'entête Authorization
          },
        }
      );
      alert('Informations mises à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations', error);
      alert('Erreur lors de la mise à jour des informations');
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file);

      try {
        const response = await axios.post(
          'http://localhost:8000/api/upload-profile-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Ajouter le token à l'entête Authorization
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setProfileImage(response.data.profile_image);  // Mettre à jour l'image de profil
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image', error);
        alert('Erreur lors du téléchargement de l\'image');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mon Profil</h1>

      {/* Section Photo de profil */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            src={`http://localhost:8000${profileImage}`}
            alt="Photo de profil"
            className="w-full h-full rounded-full object-cover"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 bg-[#af6768] text-white p-2 rounded-full cursor-pointer hover:bg-[#d88c8d] transition duration-300"
          >
            <FaCamera className="text-lg" />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700">{name}</p>
      </div>

      {/* Formulaire de modification des informations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Modifier mes informations</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaUser className="mr-2" /> Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaUser className="mr-2" /> E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Adresse
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaPhone className="mr-2" /> Téléphone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaLock className="mr-2" /> Mot de passe (optionnel)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#af6768] text-white px-4 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;