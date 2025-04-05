import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaSearch, FaSpinner, FaRegHeart, FaHeart } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // Ajout du filtre
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/cart',
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
    }
  };

  // 🎯 Appliquer la recherche et le filtre
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => {
      if (filter === 'wishlist') return wishlist.includes(product.id);
      return true;
    })
    .sort((a, b) => {
      if (filter === 'low-to-high') return a.price - b.price;
      if (filter === 'high-to-low') return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#af6768]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#242730] tracking-tight">Our Products</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of high-quality products
          </p>
        </div>

        {/* Barre de recherche et filtre */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#af6768] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sélecteur de filtre */}
          <select
            className="pl-3 pr-4 py-2 border rounded-xl bg-white shadow-sm focus:ring-[#af6768] focus:border-[#af6768]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous les produits</option>
            <option value="low-to-high">Prix : Bas à Haut</option>
            <option value="high-to-low">Prix : Haut à Bas</option>
            <option value="wishlist">Mes Favoris ❤️</option>
          </select>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/400x300'}
                  alt={product.name}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Add to wishlist"
                >
                </button>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="absolute bottom-0 left-0 right-0 bg-[#af6768] text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#242730] mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 h-12">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#af6768]">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-[#242730] mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
