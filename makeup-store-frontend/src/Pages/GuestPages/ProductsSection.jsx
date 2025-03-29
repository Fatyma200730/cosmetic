import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Il y a eu un problème avec la récupération des catégories", error);
      });
  }, []);

  return (
    <section id="productSection" className="py-16 bg-[#f6f7f9]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#242730] mb-4 text-center">Besoin d'un peu d'inspiration ?</h2>
        <p className="text-center text-[#6D4D58] mb-12 text-lg">Découvrez nos produits les plus populaires.</p>

        {/* Conteneur en ligne avec défilement horizontal si nécessaire */}
        <div className="flex justify-center items-center gap-6 overflow-x-auto p-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex-shrink-0"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="flex justify-center mb-4">
                {category.icon && (
                  <div className="bg-[#f6f7f9] p-4 rounded-full group-hover:bg-[#e8d5dc] transition-colors duration-300">
                    <img
                      src={`http://localhost:8000/storage/${category.icon}`}
                      alt={category.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
              </div>
              <p className="text-[#242730] font-medium group-hover:text-[#8C4A57] transition-colors duration-300">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
