import React from 'react';
import back from '../../assets/back.jfif';

const HomeSection = () => {
  // Fonction pour faire défiler la page jusqu'à la section des produits
  const handleClick = () => {
    const productsSection = document.getElementById('productSection');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' }); // Défilement en douceur
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Partie gauche : Texte */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f6f7f9]">
        <div className="max-w-md text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold text-[#765242] animate-fade-in-down">
            Bienvenue chez Beautify
          </h1>
          <p className="text-xl text-[#af6768] animate-fade-in-up">
            Découvrez les meilleurs produits de maquillage pour votre peau.
          </p>
          <button
            onClick={handleClick} // Ajouter la fonction de défilement
            className="bg-[#765242] hover:bg-[#d88c8d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#765242] transition duration-300 animate-fade-in"
          >
            Acheter maintenant
          </button>
        </div>
      </div>

      {/* Partie droite : Image */}
      <img
        className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        src={back}
        alt="Produits de maquillage"
      />
    </div>
  );
};

export default HomeSection;
