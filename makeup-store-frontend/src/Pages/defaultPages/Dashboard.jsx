import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [wishlist, setWishlist] = useState([]);  // Liste des produits favoris
  const [cartItems, setCartItems] = useState([]); // Articles dans le panier
  const [offres, setOffres] = useState([]); // Offres disponibles
  const [user, setUser] = useState(null); // Données de l'utilisateur
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Erreur potentielle
  const navigate = useNavigate(); // Navigation pour afficher un produit spécifique

  // Récupérer les articles du panier
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token JWT
        const response = await axios.get("http://localhost:8000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data); // Mettre à jour l'état du panier
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    fetchCartItems();
  }, []);

  // Récupérer les offres valides
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token JWT
        const response = await axios.get("http://localhost:8000/api/offres-valides", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffres(response.data); // Mettre à jour l'état des offres
      } catch (error) {
        console.error("Erreur lors de la récupération des offres :", error);
      }
    };
    fetchOffres();
  }, []);

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token JWT
        const response = await axios.get("http://localhost:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Stocker les données de l'utilisateur
      } catch (error) {
        setError('Erreur lors de la récupération des données');
        console.error(error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchUserData();
  }, []);

  // Affichage pendant le chargement ou en cas d'erreur
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Section de bienvenue */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold">👋 Bienvenue, <span className="text-yellow-300">{user.name}</span> !</h2>
        <p className="mt-2 text-lg">Découvrez vos commandes récentes et les meilleures offres.</p>
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {/* Dernières commandes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaShoppingCart className="text-pink-500" /> Dernières commandes
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 mt-4">Aucune commande dans le panier pour l'instant.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {cartItems.map((order) => (
                <li key={order.id} className="border-b py-4">
                  <h4 className="font-semibold">Commande #{order.id} - {order.status}</h4>
                  <div className="space-y-3 mt-4">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between p-2 bg-gray-100 rounded-lg">
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                        <span className="text-sm text-gray-500">Prix: {item.product.price}€</span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Produits favoris */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaHeart className="text-red-500" /> Produits Favoris
          </h3>
          {wishlist.length === 0 ? (
            <p className="text-gray-500 mt-4">Aucun favori pour l’instant.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {wishlist.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Offres & Promotions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            🎁 Offres & Promotions
          </h3>
          {offres.length === 0 ? (
            <p className="text-gray-500 mt-4">Aucune offre disponible pour le moment.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {offres.map((offre) => (
                <li key={offre.id} className="bg-pink-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-pink-600">{offre.title}</p>
                  <p className="text-sm text-gray-600">{offre.description}</p>
                  <p className="text-green-600 font-medium">- {offre.discount} %</p>
                  <p className="text-xs text-gray-400">Valable jusqu'au : {offre.valid_until}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
