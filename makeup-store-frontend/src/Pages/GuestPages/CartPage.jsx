import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token"); // Vérifier l'authentification

  // Charger le panier local ou depuis l'API
  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(response.data);
        } catch (error) {
          console.error("Erreur de chargement du panier", error);
        }
      } else {
        // Utiliser le panier local si non connecté
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      }
    };
    fetchCart();
  }, [token]);

  // Sauvegarder le panier après connexion
  const saveCartToDB = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log("Données envoyées au backend :", storedCart); // 🔍 Debug

    try {
      await axios.post(
        "http://localhost:8000/api/save-cart",
        { cart: storedCart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      console.error("Erreur lors de l'envoi du panier :", error);
    }
  };


  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Supprimer un produit
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Produit supprimé du panier !");
  };

  // Calcul du total
  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price || 0) * item.quantity, 0);

  // Confirmer la commande
  const handleConfirmOrder = async () => {
    if (!token) {
      toast.error("Vous devez être connecté pour passer commande !");
      navigate("/login");
    } else {
      await saveCartToDB(); // Sauvegarder dans la base de données
      setCart([]); // Vider le panier
      toast.success("Commande confirmée avec succès !");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#242730] flex items-center">
            <div className="bg-[#af6768] p-3 rounded-lg mr-4">
              <FaShoppingCart className="text-white text-xl" />
            </div>
            Mon Panier
            {cart.length > 0 && (
              <span className="ml-3 bg-[#af6768] text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#af6768] hover:text-[#d88c8d] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continuer mes achats
          </button>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaShoppingCart className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-[#242730] mb-2">Votre panier est vide</h3>
            <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-6 py-3 bg-[#af6768] text-white font-medium rounded-lg hover:bg-[#d88c8d] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Parcourir les produits
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    {/* Product Info */}
                    <div className="flex items-center mb-4 sm:mb-0">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-[#242730]">{item.name}</h3>
                        <p className="text-[#af6768] font-medium">
                          ${parseFloat(item.price || 0).toFixed(2)}
                        </p>

                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-end">
                      <div className="flex items-center border border-gray-200 rounded-lg mr-6">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className={`px-3 py-1 ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#242730] hover:bg-gray-50'}`}
                        >
                          <FaMinus />
                        </button>
                        <span className="px-4 py-1 text-[#242730] font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 text-[#242730] hover:bg-gray-50"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#242730]">Total</h3>
                <span className="text-xl font-bold text-[#af6768]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleConfirmOrder}
                  className="w-full flex items-center justify-center px-6 py-3 bg-[#242730] text-white font-medium rounded-lg hover:bg-[#3b3f46] transition-colors"
                >
                  Confirmer la commande
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full flex items-center justify-center px-6 py-3 border border-[#af6768] text-[#af6768] font-medium rounded-lg hover:bg-[#faf0f0] transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Continuer mes achats
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;