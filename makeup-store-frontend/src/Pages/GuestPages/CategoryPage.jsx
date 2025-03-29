import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour ajouter un produit au panier local (inchangée)
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier');
  };

  useEffect(() => {
    console.log("Category ID:", categoryId);

    if (categoryId) {
      axios.get(`http://localhost:8000/api/category/${categoryId}`)
        .then(response => {
          if (response.data.message === 'Catégorie non trouvée') {
            setError('Catégorie non trouvée');
          } else if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            setError('Une erreur inattendue est survenue.');
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des produits :", error);
          setError('Une erreur est survenue lors de la récupération des produits.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('ID de catégorie invalide.');
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f6f7f9]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8C4A57]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f6f7f9] p-6 text-center">
        <svg className="w-16 h-16 text-[#8C4A57] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h2 className="text-2xl font-serif font-bold text-[#3A0F22] mb-2">Oups !</h2>
        <p className="text-lg text-[#6D4D58] max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-b from-[#FFF9FB] to-[#FFF0F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#3A0F22] mb-4">
            Nos Produits Exclusifs
          </h2>
          <p className="text-lg text-[#6D4D58]">
            Découvrez notre sélection soigneusement choisie pour vous
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#242730] mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#8C4A57]">{product.price} DH</span>
                    {product.rating && (
                      <div className="flex items-center">
                        <div className="text-[#D4A5B3]">
                          {"★".repeat(Math.round(product.rating))}
                          {"☆".repeat(5 - Math.round(product.rating))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-[#8C4A57] to-[#D4A5B3] hover:from-[#6D3A47] hover:to-[#B38592] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <svg className="mx-auto h-16 w-16 text-[#D4A5B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <h3 className="mt-4 text-xl font-medium text-[#3A0F22]">Aucun produit disponible</h3>
            <p className="mt-2 text-[#6D4D58]">
              Nous n'avons trouvé aucun produit dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;