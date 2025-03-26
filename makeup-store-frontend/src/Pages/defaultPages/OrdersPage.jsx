import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const response = await axios.get("http://localhost:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des commandes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes Commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        <ul className="border p-4 rounded-lg">
          {orders.map((order) => (
            <li key={order.id} className="mb-2 p-2 border-b">
              <p>
                <strong>Commande #{order.id}</strong> - Total: {order.total_price} €
              </p>
              <p>
                <strong>Statut:</strong>{" "}
                <span className={order.status === "en attente" ? "text-yellow-500" : order.status === "expédié" ? "text-blue-500" : "text-green-500"}>
                  {order.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
