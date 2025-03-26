import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    axios
      .get(`http://localhost:8000/api/search?q=${query}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de recherche :", error);
        setError("Aucun produit trouvé.");
        setLoading(false);
      });
  }, [query]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    // Récupérer le panier actuel depuis localStorage ou initialiser un panier vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si le produit est déjà dans le panier
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      // Si le produit existe déjà, augmenter la quantité
      productInCart.quantity += 1;
    } else {
      // Sinon, ajouter le produit avec une quantité de 1
      cart.push({ ...product, quantity: 1 });
    }

    // Mettre à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produit ajouté au panier !');
  };

  return (
    <section className="py-12 bg-[#f6f7f9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#242730] mb-8">
          Résultats pour : <span className="text-[#af6768]">{query}</span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-xl">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  {/* Image du produit */}
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Détails du produit */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#242730] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#af6768]">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)} // Ajout au panier
                        className="bg-[#af6768] text-white px-4 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 col-span-full">
                Aucun produit trouvé pour cette recherche.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
