import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa'; // Importez des icônes (exemple avec react-icons)
import icon2 from '../assets/icon2.png'; // Importez votre icône personnalisée

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#af6768] to-[#d88c8d] shadow-lg h-40 font-poppins">
      {/* Première ligne */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Icône à gauche */}
          <div className="flex items-center">
            <img src={icon2} alt="Logo" className="h-12 w-12 invert transform hover:rotate-12 transition-transform duration-300" /> {/* Animation de rotation au survol */}
          </div>

          {/* Titre au centre */}
          <div className="text-4xl font-bold text-[#ffffff] mx-auto tracking-wide transform hover:scale-105 transition-transform duration-300">Beautify</div> {/* Effet de zoom au survol */}

          {/* Icônes à droite */}
          <div className="flex items-center space-x-6">
            <Link to="/search" className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110">
              <FaSearch className="text-2xl" />
            </Link>
            <Link to="/login" className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110">
              <FaUser className="text-2xl" />
            </Link>
            <Link to="/cart" className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110">
              <FaShoppingCart className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grand espace entre les deux lignes */}
      <div className="my-6"></div> {/* Réduit un peu l'espace pour un design plus compact */}

      {/* Deuxième ligne (menu) */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-center space-x-8">
          <a href="#" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">Home</a>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div> 
          <a href="#products" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">Products</a>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div> 
          <a href="#blogs" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">Blogs</a>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>
          <a href="#about-us" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">About Us</a>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div> 
          <a href="#media" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">Media</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;