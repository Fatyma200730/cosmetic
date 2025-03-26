import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaChevronDown } from 'react-icons/fa';
import icon2 from '../assets/icon2.png';
import axios from 'axios';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <div className="relative">
      <FaShoppingCart className="text-2xl text-[#ffffff]" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Données invalides reçues :", response.data);
        }
      })
      .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
  }, []);

  const handleScroll = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/api/search?q=${searchQuery}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          navigate(`/search?q=${searchQuery}`);
        } else {
          alert("Aucun produit trouvé");
        }
      })
      .catch(() => alert("Erreur lors de la recherche"));
  };

  const handleCategoryClick = (categoryId) => {
    setShowCategories(false);
    navigate(`/category/${categoryId}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#af6768] to-[#d88c8d] shadow-lg h-40 font-poppins">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={icon2} alt="Logo" className="h-12 w-12 invert transform hover:rotate-12 transition-transform duration-300" />
          </div>

          {showSearch ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center mx-auto" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 border border-[#ffffff] rounded-lg bg-transparent text-[#ffffff] placeholder-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]"
                placeholder="Rechercher..."
                autoFocus
              />
            </form>
          ) : (
            <div className="text-4xl font-bold text-[#ffffff] mx-auto tracking-wide transform hover:scale-105 transition-transform duration-300">
              Beautify
            </div>
          )}

          <div className="flex items-center space-x-6">
            <button
              onClick={handleSearchClick}
              className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110"
            >
              <FaSearch className="text-2xl" />
            </button>
            <Link to="/login" className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110">
              <FaUser className="text-2xl" />
            </Link>
            <Link to="/cart" className="text-[#ffffff] hover:text-[#242730] transition duration-300 transform hover:scale-110">
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="my-6"></div>

      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-center space-x-8">
          <Link to="/" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">
            Accueil
          </Link>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>

          <div className="relative inline-block" ref={categoryRef}>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105 flex items-center"
            >
              Catégories <FaChevronDown className="ml-2" />
            </button>

            {showCategories && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-[#af6768] hover:text-white transition duration-300"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">Aucune catégorie</li>
                )}
              </ul>
            )}
          </div>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>

          <Link to="/products" className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">
            Produits
          </Link>

          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>
          <button onClick={() => handleScroll("review")} className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">
            Avis
          </button>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>
          <button onClick={() => handleScroll("about-us")} className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">
            À propos
          </button>
          <div className="border-r border-[#ffffff] opacity-20 h-6 my-auto"></div>
          <button onClick={() => handleScroll("media")} className="text-[#ffffff] hover:text-[#242730] font-semibold text-lg tracking-wider transition duration-300 transform hover:scale-105">
            Média
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
