import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col items-center justify-center p-6">
      {/* Illustration */}
      <img
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif" // Remplacez par votre illustration
        alt="404 Illustration"
        className="w-64 h-64 mb-8"
      />

      {/* Titre */}
      <h1 className="text-6xl font-bold text-[#af6768] mb-4">Oops !</h1>

      {/* Sous-titre */}
      <p className="text-2xl text-[#242730] mb-8 text-center">
        Il semble que vous vous soyez perdu. La page que vous cherchez n'existe pas.
      </p>

      {/* Bouton */}
      <Link
        to="/"
        className="bg-[#af6768] text-white px-8 py-3 rounded-lg hover:bg-[#d88c8d] transition duration-200 flex items-center space-x-2"
      >
        <span>Retour à l'accueil</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
};

export default NotFound;