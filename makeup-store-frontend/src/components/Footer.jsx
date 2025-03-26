import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#af6768] text-white py-12 font-poppins">
      <div className="max-w-6xl mx-auto px-4">
        {/* Grille pour les sections du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1 : À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de nous</h3>
            <p className="text-sm text-gray-300">
              Beautify est une marque dédiée à vous offrir les meilleurs produits de beauté et de soins personnels. Nous croyons en la beauté naturelle et en la confiance en soi.
            </p>
          </div>

          {/* Section 2 : Liens utiles */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-gray-300 hover:text-[#ffffff] transition duration-300">Accueil</a></li>
              <li><a href="/products" className="text-sm text-gray-300 hover:text-[#ffffff] transition duration-300">Produits</a></li>
              <li><a href="/blogs" className="text-sm text-gray-300 hover:text-[#ffffff] transition duration-300">Blogs</a></li>
              <li><a href="/about-us" className="text-sm text-gray-300 hover:text-[#ffffff] transition duration-300">À propos</a></li>
              <li><a href="/contact" className="text-sm text-gray-300 hover:text-[#ffffff] transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Section 3 : Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-300" />
                <span className="text-sm text-gray-300">123 Rue Beauté, Paris, France</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-sm text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-300" />
                <span className="text-sm text-gray-300">contact@beautify.com</span>
              </li>
            </ul>
          </div>

          {/* Section 4 : Newsletter et réseaux sociaux */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés et offres exclusives.
            </p>

            {/* Réseaux sociaux */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-300 hover:text-[#ffffff] transition duration-300">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="https://twitter.com" className="text-gray-300 hover:text-[#ffffff] transition duration-300">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="https://instagram.com" className="text-gray-300 hover:text-[#ffffff] transition duration-300">
                  <FaInstagram className="text-2xl" />
                </a>
                <a href="https://linkedin.com" className="text-gray-300 hover:text-[#ffffff] transition duration-300">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Beautify. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;