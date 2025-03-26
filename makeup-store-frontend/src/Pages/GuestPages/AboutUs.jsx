import React from 'react';
import about from '../../assets/about.jfif';

const AboutUs = () => {
  // Fonction pour faire défiler la page jusqu'à la section des produits
  const handleDiscoverClick = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#f6f7f9]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#242730] mb-8">
          À propos de nous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg h-full">
            <img
              src={about}
              alt="Notre philosophie beauté"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#242730]">
              Beautify - Redéfinir la beauté
            </h3>
            <p className="text-lg text-gray-600">
              Chez Beautify, nous croyons que la beauté est bien plus qu'une apparence. 
              C'est une expression de confiance, de créativité et de bien-être. 
              Nous nous engageons à vous offrir des produits de maquillage qui non seulement 
              subliment votre apparence, mais prennent également soin de votre peau.
            </p>
            <p className="text-lg text-gray-600">
              Notre philosophie repose sur trois piliers : **qualité**, **innovation** et **durabilité**. 
              Chaque produit que nous créons est conçu avec soin, en utilisant des ingrédients 
              naturels et des formules respectueuses de l'environnement. Nous voulons que vous 
              vous sentiez bien dans votre peau, tout en prenant soin de la planète.
            </p>
            <div className="flex space-x-4">
              {/* Ajouter le clic pour faire défiler la page */}
              <button
                onClick={handleDiscoverClick} // Ajout de l'événement pour faire défiler
                className="bg-[#af6768] text-white px-6 py-3 rounded-lg hover:bg-[#d88c8d] transition duration-300"
              >
                Découvrir nos produits
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-[#242730] mb-4">Qualité</h4>
            <p className="text-gray-600">
              Des produits testés et approuvés par des experts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-[#242730] mb-4">Durabilité</h4>
            <p className="text-gray-600">
              Des emballages recyclables et des formules respectueuses de l'environnement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-[#242730] mb-4">Innovation</h4>
            <p className="text-gray-600">
              Des produits à la pointe de la technologie beauté.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-[#242730] mb-4">Communauté</h4>
            <p className="text-gray-600">
              Rejoignez une communauté de passionnés de beauté.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
