import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewProducts = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/new-arrivals")
      .then((response) => {
        setNewArrivals(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des nouveaux produits:', error);
      });
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Ajouter une notification ou un feedback visuel ici si nécessaire
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FFF9FB] to-[#FFF0F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#3A0F22] mb-4">
            Nos Nouveautés Exclusives
          </h2>
          <p className="text-lg text-[#6D4D58] max-w-2xl mx-auto">
            Découvrez les dernières innovations beauté ajoutées à notre collection
          </p>
        </div>

        <Slider {...settings} className="pb-12">
          {newArrivals.map((product) => (
            <div key={product.id} className="px-3 focus:outline-none h-[500px] mb-2">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Product Badge */}
                <div className="absolute top-4 right-4 bg-[#8C4A57] text-white text-xs font-bold px-2 py-1 rounded-full">
                  Nouveau
                </div>

                {/* Image Container */}
                <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-[#242730] mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mt-auto mb-4">
                  <span className="text-2xl font-bold text-[#8C4A57]">${product.price}</span>
                  {product.rating && (
                    <div className="flex items-center">
                      <div className="text-[#D4A5B3] mr-1">
                        {"★".repeat(Math.round(product.rating))}
                        {"☆".repeat(5 - Math.round(product.rating))}
                      </div>
                      <span className="text-sm text-gray-500">({product.rating})</span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-[#8C4A57] to-[#D4A5B3] hover:from-[#6D3A47] hover:to-[#B38592] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewProducts;