import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        toast.error("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      toast.info("Ce produit est déjà dans votre panier !");
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Produit ajouté au panier !");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal stylisé */}
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 relative inline-block">
            <span className="relative z-10 px-4">
              Nos Produits
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#af6768] opacity-30 z-0 transform translate-y-1"></span>
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-xl text-gray-600 mx-auto font-medium italic">
            Découvrez notre sélection exclusive
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#af6768] to-transparent rounded-full"></div>
          </div>        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af6768]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={product.image || "https://via.placeholder.com/500"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    {/* Titre du produit avec effet de soulignement au survol */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 relative inline-block">
                      <Link 
                        to={`/product/${product.id}`}
                        className="hover:text-[#af6768] transition-colors duration-200"
                      >
                        {product.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#af6768] transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    {/* Prix avec style accentué */}
                    <p className="text-xl font-extrabold text-[#af6768]">
                      {product.price} DH
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-[#af6768] text-white py-3 rounded-lg hover:bg-[#d88c8d] transition-all duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
                  >
                    <FaShoppingCart className="mr-2 text-lg" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;