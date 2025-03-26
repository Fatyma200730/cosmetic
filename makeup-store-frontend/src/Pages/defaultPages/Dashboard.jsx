import React from "react";
import { FaShoppingCart, FaStar, FaHistory, FaGift, FaEnvelope } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Section de bienvenue */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold">👋 Bienvenue, <span className="text-yellow-300">Sarah</span> !</h2>
        <p className="mt-2 text-lg">Découvrez vos commandes récentes et les meilleures offres.</p>
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Dernières commandes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaShoppingCart className="text-pink-500" /> Dernières commandes
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-between">Palette Maquillage <span className="text-green-500">Livrée</span></li>
            <li className="flex justify-between">Rouge à Lèvres <span className="text-yellow-500">En cours</span></li>
            <li className="flex justify-between">Crème Hydratante <span className="text-red-500">Annulée</span></li>
          </ul>
        </div>

        {/* Produits favoris */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaStar className="text-yellow-500" /> Produits favoris
          </h3>
          <ul className="mt-4 space-y-3">
            <li>🌸 Sérum Visage</li>
            <li>💄 Gloss Brillant</li>
            <li>🧴 Lotion Hydratante</li>
          </ul>
        </div>

        {/* Notifications & Offres */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaGift className="text-red-500" /> Offres & Promotions
          </h3>
          <p className="mt-2">- 20% sur toute la gamme maquillage ! 🎉</p>
          <p>- Livraison gratuite dès 50€ d'achat.</p>
        </div>

        {/* Historique des achats */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaHistory className="text-blue-500" /> Historique des achats
          </h3>
          <p className="mt-2 text-gray-600">Consultez toutes vos commandes passées.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Voir l'historique</button>
        </div>

        {/* Contact service client */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaEnvelope className="text-green-500" /> Service Client
          </h3>
          <p className="mt-2 text-gray-600">Besoin d'aide ? Contactez-nous !</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">Envoyer un message</button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
