import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaHistory, FaShoppingCart, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Importer l'action logout

const NavDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth); // Récupérer l'utilisateur et le token du store

  const handleLogout = () => {
    // Déconnexion via Redux
    dispatch(logout());

    // Redirection vers la page de login
    navigate('/login');

    // Rafraîchissement de la page pour forcer une nouvelle authentification
    window.location.reload();
  };

  const getLinkClass = (path) => {
    // Pour les chemins relatifs, nous utilisons `location.pathname` et extrayons le dernier segment
    const currentPath = location.pathname.split('/').pop(); // Extraire le dernier segment du chemin actuel
    return currentPath === path
      ? 'text-[#242730] bg-white p-2 rounded-md font-semibold transition-all duration-300 transform scale-105' // Lien actif
      : 'text-white hover:text-[#242730] transition-all duration-300 transform hover:scale-105'; // Lien inactif
  };

  return (
    <nav className="bg-gradient-to-b from-[#af6768] to-[#d88c8d] shadow-lg w-64 min-h-screen font-poppins fixed">
      <div className="p-6">
        <div className="text-2xl font-bold text-white tracking-wide transform hover:scale-105 transition-transform duration-300">
          Beautify
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-white focus:outline-none"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block p-6`} onClick={() => setIsOpen(false)}>
        <Link
          to="/dashboard"
          className={`${getLinkClass('/dashboard')} flex items-center space-x-3 mb-4`}
        >
          <FaHome className="text-xl" />
          <span>Tableau de bord</span>
        </Link>
        <Link
          to="profile"
          className={`${getLinkClass('profile')} flex items-center space-x-3 mb-4`}
        >
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>
        <Link
          to="orders"
          className={`${getLinkClass('orders')} flex items-center space-x-3 mb-4`}
        >
          <FaHistory className="text-xl" />
          <span>Commandes</span>
        </Link>
        <Link
          to="cart"
          className={`${getLinkClass('cart')} flex items-center space-x-3 mb-4`}
        >
          <FaShoppingCart className="text-xl" />
          <span>Panier</span>
        </Link>
        <Link
          to="reviews"
          className={`${getLinkClass('reviews')} flex items-center space-x-3 mb-4`}
        >
          <FaStar className="text-xl" />
          <span>Avis</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-[#242730] flex items-center space-x-3 transition duration-300 transform hover:scale-105"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
};

export default NavDashboard;
