import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        toast.error("Produit introuvable !");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-600">Chargement du produit...</p>
        ) : product ? (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/600"}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <p className="text-xl font-semibold text-[#af6768] mt-4">
                ${product.price}
              </p>
              <button
                className="mt-6 w-full bg-[#af6768] text-white py-3 rounded-lg hover:bg-[#d88c8d] transition"
              >
                <FaShoppingCart className="inline-block mr-2" />
                Ajouter au panier
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Produit non trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
