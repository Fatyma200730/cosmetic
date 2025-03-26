import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import LipstickIcon from '../../assets/icons/icons8-lip.png';
import FoundationIcon from '../../assets/icons/icons8-foundation-makeup-96.png';
import MascaraIcon from '../../assets/icons/icons8-foundation-makeup-96.png';
import BlushIcon from '../../assets/icons/icons8-blush-99.png';
import PaletteIcon from '../../assets/icons/icons8-foundation-makeup-96.png';

const ProductsSection = () => {
  const navigate = useNavigate(); // Initialisez useNavigate

  return (
    <section id="guidance" className="py-12 bg-custom-pink">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">Besoin d'un peu d'inspiration ?</h2>
        <p className="text-center text-gray-600 mb-8">Découvrez nos produits les plus populaires.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Carte 1 : Rouge à lèvres */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/rouge-a-levres')} // Redirection vers la catégorie Rouge à lèvres
          >
            <div className="flex justify-center mb-4">
              <img src={LipstickIcon} alt="Rouge à lèvres" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Rouge à lèvres</p>
          </div>

          {/* Carte 2 : Fond de teint */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/fond-de-teint')} // Redirection vers la catégorie Fond de teint
          >
            <div className="flex justify-center mb-4">
              <img src={FoundationIcon} alt="Fond de teint" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Fond de teint</p>
          </div>

          {/* Carte 3 : Mascara */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/mascara')} // Redirection vers la catégorie Mascara
          >
            <div className="flex justify-center mb-4">
              <img src={MascaraIcon} alt="Mascara" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Mascara</p>
          </div>

          {/* Carte 4 : Blush */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/blush')} // Redirection vers la catégorie Blush
          >
            <div className="flex justify-center mb-4">
              <img src={BlushIcon} alt="Blush" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Blush</p>
          </div>

          {/* Carte 5 : Palette de fards */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/palette-de-fards')} // Redirection vers la catégorie Palette de fards
          >
            <div className="flex justify-center mb-4">
              <img src={PaletteIcon} alt="Palette de fards" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Palette de fards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
