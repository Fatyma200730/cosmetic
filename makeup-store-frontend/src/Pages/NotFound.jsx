import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-pink-400 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link to="/" className="bg-pink-400 text-white px-6 py-3 rounded-lg hover:bg-pink-500 transition duration-200">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;