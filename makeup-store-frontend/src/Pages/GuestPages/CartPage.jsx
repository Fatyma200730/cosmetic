import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null; // Vérifier si l'utilisateur est connecté

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Modifier la quantité d'un produit
  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: Math.max(product.quantity + change, 1) };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Supprimer un produit du panier
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Produit supprimé du panier !");
  };

  // Calcul du prix total
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Confirmer la commande
  const handleConfirmOrder = () => {
    if (!isAuthenticated) {
      toast.warning("Veuillez vous connecter pour passer une commande !");
      navigate("/login"); // Redirige vers la page de connexion
      return;
    }
    toast.success("Commande confirmée avec succès !");
    localStorage.removeItem("cart"); // Vider le panier après confirmation
    setCart([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-[#242730] mb-8 flex items-center justify-center">
        <FaShoppingCart className="mr-2" /> Votre Panier
      </h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Votre panier est vide</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#af6768] text-white px-6 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300 flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Retour à l'accueil
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Image et nom du produit */}
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "https://via.placeholder.com/100"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-lg font-semibold text-[#242730]">{product.name}</span>
                    <p className="text-sm text-gray-500">${product.price} x {product.quantity}</p>
                  </div>
                </div>

                {/* Contrôle des quantités et suppression */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="text-lg font-semibold">{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Prix total */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-[#242730]">
              Total : <span className="text-[#af6768]">${totalPrice}</span>
            </h3>
          </div>

          {/* Bouton de confirmation */}
          <div className="text-center mt-8">
            <button
              onClick={handleConfirmOrder}
              className="bg-[#af6768] text-white px-8 py-3 rounded-lg hover:bg-[#d88c8d] transition duration-300 flex items-center justify-center mx-auto"
            >
              <FaShoppingCart className="mr-2" /> Confirmer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;