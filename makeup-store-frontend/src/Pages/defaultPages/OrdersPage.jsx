import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaBox, FaShippingFast, FaCheckCircle, FaSpinner } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté pour voir vos commandes.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des commandes.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "en attente":
        return <FaSpinner className="mr-2 animate-spin" />;
      case "expédié":
        return <FaShippingFast className="mr-2" />;
      case "livré":
        return <FaCheckCircle className="mr-2" />;
      default:
        return <FaBox className="mr-2" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "en attente":
        return "bg-yellow-100 text-yellow-800";
      case "expédié":
        return "bg-blue-100 text-blue-800";
      case "livré":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[#242730] mb-2">Oups !</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-[#af6768] text-white rounded-lg hover:bg-[#d88c8d] transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#242730] flex items-center">
            <FaBoxOpen className="mr-3 text-[#af6768]" />
            Mes Commandes
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaBoxOpen className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-[#242730] mb-2">Aucune commande passée</h3>
            <p className="text-gray-500 mb-6">Vos commandes apparaîtront ici une fois passées</p>
            <a
              href="/dashboard/products"
              className="inline-flex items-center px-6 py-3 bg-[#af6768] text-white font-medium rounded-lg hover:bg-[#d88c8d] transition-colors"
            >
              Parcourir les produits
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const formattedTotalPrice = parseFloat(order.total_price).toFixed(2);
              const formattedDate = new Date(order.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-bold text-[#242730]">Commande :#{order.id}</h3>
                        <p className="text-gray-500">Passée le {formattedDate}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-medium text-[#242730] mb-3">Articles</h4>
                      <ul className="divide-y divide-gray-200">
                        {order.order_items.map((item) => (
                          <li key={item.id} className="py-3 flex justify-between">
                            <div className="flex items-center">
                              <img
                                src={item.product.image || 'https://via.placeholder.com/60'}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <p className="font-medium text-[#242730]">{item.product.name}</p>
                                <p className="text-gray-500 text-sm">{item.quantity} x {parseFloat(item.price).toFixed(2)} €</p>
                              </div>
                            </div>
                            <p className="font-medium">{(item.quantity * parseFloat(item.price)).toFixed(2)} €</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-[#af6768]">{formattedTotalPrice} €</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;