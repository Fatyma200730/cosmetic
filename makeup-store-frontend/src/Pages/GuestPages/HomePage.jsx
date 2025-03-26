import React from 'react';
import HomeSection from './HomeSection';
import ProductsSection from './ProductsSection';
import Review from './Review';
import MediaSection from './MediaSection';
import AboutUs from './AboutUs';
import NewProducts from './NewProducts';

const HomePage = () => {
  return (
    <div>
      {/* Section Home */}
      <section id="home" className="bg-gradient-to-r from-[#af6768] to-[#d88c8d]">
        <HomeSection />
      </section>

      <section className="py-12 bg-white">
        <NewProducts />
      </section>
      {/* Section Produits */}
      <section id="products" className="py-12 bg-white">
        <ProductsSection />
      </section>

      {/* Section Avis/Blogs */}
      <section id="review" className="py-12 bg-">
        <Review />
      </section>

      {/* Section À propos */}
      <section id="about-us" className="py-12 bg-[#f6f7f9]">
        <AboutUs />
      </section>

      {/* Section Média */}
      <section id="media" className="py-12 bg-white">
        <MediaSection />
      </section>
    </div>
  );
};

export default HomePage;