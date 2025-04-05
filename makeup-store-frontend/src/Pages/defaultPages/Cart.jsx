import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaPlus, FaMinus, FaCheck } from 'react-icons/fa';

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
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération du panier",err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/cart/${id}`, { quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } catch (err) {
      setError("Erreur lors de la mise à jour de la quantité",err);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression du produit",err);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/confirm-order', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setSuccessMessage("Commande confirmée avec succès !");
        setCartItems([]);
      }
    } catch (err) {
      setError("Erreur lors de la confirmation de la commande",err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-red-500 text-xl font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#6d28d9] text-white rounded-lg hover:bg-[#7c3aed] transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaShoppingCart className="mr-3 text-[#6d28d9]" />
            Mon Panier
            {cartItems.length > 0 && (
              <span className="ml-3 bg-[#6d28d9] text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </h1>
          <Link
            to="/dashboard/products"
            className="flex items-center text-[#6d28d9] hover:text-[#7c3aed] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continuer mes achats
          </Link>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <FaCheck className="text-green-500 mr-3" />
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaShoppingCart className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Votre panier est vide</h3>
            <p className="text-gray-500 mb-6">Commencez à ajouter des produits pour les voir apparaître ici</p>
            <Link
              to="/dashboard/products"
              className="inline-flex items-center px-6 py-3 bg-[#6d28d9] text-white font-medium rounded-lg hover:bg-[#7c3aed] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Parcourir les produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <img
                          src={item.product?.image || 'https://via.placeholder.com/80'}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.product?.name}</h3>
                          <p className="text-[#6d28d9] font-medium">
                            ${parseFloat(item.product?.price || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end">
                        <div className="flex items-center border border-gray-200 rounded-lg mr-6">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`px-3 py-1 ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            <FaMinus />
                          </button>
                          <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Total</h3>
                <span className="text-xl font-bold text-[#6d28d9]">
                  ${cartItems.reduce((total, item) => total + parseFloat(item.product?.price || 0) * item.quantity, 0).toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-[#6d28d9] text-white font-medium rounded-lg hover:bg-[#7c3aed] transition-colors"
                >
                  <FaCheck className="mr-2" />
                  Confirmer la commande
                </button>

                <Link
                  to="/dashboard/products"
                  className="flex-1 flex items-center justify-center px-6 py-3 border border-[#6d28d9] text-[#6d28d9] font-medium rounded-lg hover:bg-[#f5f3ff] transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;