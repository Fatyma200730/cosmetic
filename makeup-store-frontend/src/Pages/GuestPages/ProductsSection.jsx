import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import BlushIcon from '../../assets/icons/icons8-blush-99.png';
import FoundationIcon from '../../assets/icons/icons8-foundation-makeup-96.png';
import FaceIcon from '../../assets/icons/icons8-face100.png';
import CheekIcon from '../../assets/icons/icons8-cheekbrush-100.png';
import LipIcon from '../../assets/icons/icons8-lip.png';
import SettingIcon from '../../assets/icons/icons8-settingpowder.png';
import TrendingIcon from '../../assets/icons/icons8-trending.png';
import SaleIcon from '../../assets/icons/icons8-sale-64.png';

const ProductsSection = () => {
  const navigate = useNavigate(); // Initialisez useNavigate

  return (
    <section id="guidance" className="py-12 bg-custom-pink">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">Need a Little Guidance?</h2>
        <p className="text-center text-gray-600 mb-8">Check out what's popular now.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {/* Carte 1 : Blush */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/blush')} // Redirection vers la page Blush
          >
            <div className="flex justify-center mb-4">
              <img src={BlushIcon} alt="Blush" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Blush</p>
          </div>

          {/* Carte 2 : Foundation */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/foundation')} // Redirection vers la page Foundation
          >
            <div className="flex justify-center mb-4">
              <img src={FoundationIcon} alt="Foundation" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Foundation</p>
          </div>

          {/* Carte 3 : Face */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/face')} // Redirection vers la page Face
          >
            <div className="flex justify-center mb-4">
              <img src={FaceIcon} alt="Face" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Face</p>
          </div>

          {/* Carte 4 : Cheek */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/cheek')} // Redirection vers la page Cheek
          >
            <div className="flex justify-center mb-4">
              <img src={CheekIcon} alt="Cheek" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Cheek</p>
          </div>

          {/* Carte 5 : Lip */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/lip')} // Redirection vers la page Lip
          >
            <div className="flex justify-center mb-4">
              <img src={LipIcon} alt="Lip" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Lip</p>
          </div>

          {/* Carte 6 : Setting Spray and Powder */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/setting')} // Redirection vers la page Setting
          >
            <div className="flex justify-center mb-4">
              <img src={SettingIcon} alt="Setting Spray and Powder" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Setting Spray and Powder</p>
          </div>

          {/* Carte 7 : Trending on Social */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/trending')} // Redirection vers la page Trending
          >
            <div className="flex justify-center mb-4">
              <img src={TrendingIcon} alt="Trending on Social" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Trending on Social</p>
          </div>

          {/* Carte 8 : Sale */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/sale')} // Redirection vers la page Sale
          >
            <div className="flex justify-center mb-4">
              <img src={SaleIcon} alt="Sale" className="w-12 h-12" />
            </div>
            <p className="text-gray-800 font-semibold">Sale</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;