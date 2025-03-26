import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaThumbsUp } from 'react-icons/fa';

const MediaSection = () => {
  return (
    <section className="py-12 bg-[#f6f7f9]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#242730] mb-8">
          Suivez-nous et Partagez !
        </h2>
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#af6768] hover:text-[#d88c8d] transition duration-300"
          >
            <FaInstagram className="text-4xl" />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#af6768] hover:text-[#d88c8d] transition duration-300"
          >
            <FaWhatsapp className="text-4xl" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#af6768] hover:text-[#d88c8d] transition duration-300"
          >
            <FaFacebook className="text-4xl" />
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
          <div className="flex items-center space-x-4">
            <FaThumbsUp className="text-4xl text-[#af6768]" />
            <div>
              <p className="text-xl font-semibold text-[#242730]">
                Aimez notre page !
              </p>
              <p className="text-gray-600">
                Soutenez-nous en aimant notre page Facebook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;