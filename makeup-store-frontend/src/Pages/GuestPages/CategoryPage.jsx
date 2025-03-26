import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour ajouter un produit au panier local
  const addToCart = (product) => {
    // Récupérer le panier du localStorage ou créer un nouveau panier vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si le produit est déjà dans le panier
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      // Si le produit existe déjà, on augmente la quantité
      productInCart.quantity += 1;
    } else {
      // Sinon, on ajoute le produit avec une quantité de 1
      cart.push({ ...product, quantity: 1 });
    }

    // Enregistrer le panier mis à jour dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produit ajouté au panier');
  };

  useEffect(() => {
    console.log("Category ID:", categoryId); // Log the category ID

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Produits de cette catégorie
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image du produit */}
              <img
                src={product.image} // Assurez-vous que l'API renvoie une URL d'image valide
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Détails du produit */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-[#af6768]">{product.price} DH</p>
                <button
                  onClick={() => addToCart(product)} // Appeler la fonction pour ajouter au panier
                  className="mt-4 w-full bg-[#af6768] text-white px-4 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">Aucun produit trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
