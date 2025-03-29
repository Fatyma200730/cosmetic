import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté pour voir le panier.");
        return;
      }

      const response = await axios.get("http://localhost:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération du panier.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return; // Empêcher une quantité négative

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/cart/${cartId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setCartItems(cartItems.map(item =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour de la quantité.");
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté.");
        return;
      }

      await axios.delete(`http://localhost:8000/api/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(cartItems.filter((item) => item.id !== cartId));
    } catch (err) {
      setError("Erreur lors de la suppression du produit.");
      console.error(err);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccessMessage("Commande confirmée avec succès !");
        setCartItems([]); // Vider le panier après confirmation
      }
    } catch (err) {
      setError("Erreur lors de la confirmation de la commande.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#242730] mb-8 flex items-center justify-center">
        <FaShoppingCart className="mr-2" /> Votre Panier
      </h2>

      {successMessage && (
        <div className="text-center mb-4">
          <p className="text-green-600 text-lg">{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="text-center mb-4">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Votre panier est vide</p>
          <Link
            to="/dashboard/products"
            className="bg-[#af6768] text-white px-6 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300 flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Voir plus de produits
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-lg font-semibold text-[#242730]">{item.product.name}</span>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${item.product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className={`p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 ${item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={item.quantity === 1}
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-[#242730]">
              Total : $
              {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>

          <div className="text-center mt-8 space-x-4">
            <Link to="/dashboard/products" className="bg-[#af6768] text-white px-6 py-3 rounded-lg hover:bg-[#d88c8d] transition duration-300">
              Voir plus de produits
            </Link>
            <button onClick={handleConfirmOrder} className="bg-[#242730] text-white px-6 py-3 rounded-lg hover:bg-[#3b3f46] transition duration-300">
              Confirmer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
