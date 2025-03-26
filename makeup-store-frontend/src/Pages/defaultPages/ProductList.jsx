import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des produits', error));
  }, []);

  const handleAddToCart = (productId) => {
    const quantity = 1; // Quantité par défaut
    axios
      .post(
        'http://localhost:8000/api/cart',
        { product_id: productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('Produit ajouté au panier');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout au panier', error);
        alert('Erreur lors de l\'ajout du produit au panier');
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
        <FaShoppingCart className="mr-2" /> Nos Produits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            {/* Image du produit */}
            <img
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            {/* Détails du produit */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#242730] mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#af6768]">${product.price}</span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-[#af6768] text-white px-4 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300 flex items-center"
                >
                  <FaShoppingCart className="mr-2" /> Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;