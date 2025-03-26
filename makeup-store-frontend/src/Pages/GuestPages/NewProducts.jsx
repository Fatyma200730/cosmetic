import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import test from '../../assets/test.jfif';

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
    <section className="py-16 bg-gradient-to-r from-[#f6f7f9] to-[#eaeef5]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#242730] mb-12">
          Découvrez Nos Nouveautés
        </h2>
        <Slider {...settings} className='p-5'>
          {newArrivals.map((product) => (
            <div key={product.id} className="px-3">
              <div className="bg-white rounded-xl mb-1 shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-[470px] flex flex-col">

                {/* Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={test}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#af6768] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nouveau
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#242730] mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-[#af6768]">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)} // Appel à la fonction pour ajouter au panier
                      className="bg-[#af6768] text-white px-5 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewProducts;
