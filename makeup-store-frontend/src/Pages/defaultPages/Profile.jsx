import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaMapMarkerAlt, FaPhone, FaLock, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    profile_image: 'https://via.placeholder.com/150'
  });
  const [token] = useState(localStorage.getItem('token'));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          ...response.data,
          profile_image: response.data.profile_image || 'https://via.placeholder.com/150',
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchUserData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:8000/api/profile',
        { ...userData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      // Show elegant notification instead of alert
    } catch (error) {
      console.error('Update error', error);
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
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setUserData({...userData, profile_image: response.data.profile_image});
      } catch (error) {
        console.error('Image upload error', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#242730] tracking-tight">Mon Profil</h1>
          <p className="mt-2 text-lg text-gray-600">Gérez vos informations personnelles</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Profile Sidebar */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#faf0f0] to-[#f8e8e8] p-8 flex flex-col items-center">
              <div className="relative group mb-6">
                <img
                  src={`http://localhost:8000${userData.profile_image}`}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-2 right-2 bg-[#af6768] text-white p-3 rounded-full cursor-pointer hover:bg-[#d88c8d] transition-all shadow-md transform group-hover:scale-110">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <h2 className="text-2xl font-bold text-[#242730] mb-1">{userData.name}</h2>
              <p className="text-gray-600 mb-6">{userData.email}</p>

              <div className="w-full space-y-4">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  <div className="bg-[#af6768]/10 p-2 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-[#af6768]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Adresse</p>
                    <p className="font-medium text-[#242730]">{userData.address || 'Non renseignée'}</p>
                  </div>
                </div>

                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  <div className="bg-[#af6768]/10 p-2 rounded-full mr-3">
                    <FaPhone className="text-[#af6768]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="font-medium text-[#242730]">{userData.phone || 'Non renseigné'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[#242730]">Informations personnelles</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-[#af6768] text-white rounded-lg hover:bg-[#d88c8d] transition-all shadow hover:shadow-md"
                  >
                    <FaEdit className="mr-2" />
                    Modifier
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <FaTimes className="mr-2" />
                      Annuler
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center px-4 py-2 bg-[#af6768] text-white rounded-lg hover:bg-[#d88c8d] transition-all shadow hover:shadow-md"
                    >
                      <FaSave className="mr-2" />
                      Enregistrer
                    </button>
                  </div>
                )}
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl transition-all ${isEditing ? 'bg-gray-50 border border-gray-200' : ''}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-[#af6768]"
                      />
                    ) : (
                      <p className="text-lg text-[#242730]">{userData.name}</p>
                    )}
                  </div>

                  <div className={`p-4 rounded-xl transition-all ${isEditing ? 'bg-gray-50 border border-gray-200' : ''}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-[#af6768]"
                      />
                    ) : (
                      <p className="text-lg text-[#242730]">{userData.email}</p>
                    )}
                  </div>

                  <div className={`p-4 rounded-xl transition-all ${isEditing ? 'bg-gray-50 border border-gray-200' : ''}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-[#af6768]"
                      />
                    ) : (
                      <p className="text-lg text-[#242730]">{userData.address || 'Non renseignée'}</p>
                    )}
                  </div>

                  <div className={`p-4 rounded-xl transition-all ${isEditing ? 'bg-gray-50 border border-gray-200' : ''}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-[#af6768]"
                      />
                    ) : (
                      <p className="text-lg text-[#242730]">{userData.phone || 'Non renseigné'}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="bg-[#faf0f0] p-6 rounded-xl border border-[#f8e8e8]">
                    <h3 className="text-lg font-medium text-[#242730] mb-4 flex items-center">
                      <FaLock className="text-[#af6768] mr-2" />
                      Changer le mot de passe
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                        <input
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          placeholder="Laisser vide pour ne pas changer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-[#af6768]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;