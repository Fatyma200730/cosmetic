import React from 'react';
import HomeSection from './HomeSection';
import ProductsSection from './ProductsSection';
import BlogsSection from './BlogsSection';

const HomePage = () => {
  return (
    <div>
      <section id="home" className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <HomeSection />
      </section>

      <section id="products" className="py-12 bg-white">
        <ProductsSection />
      </section>
      
      <section id="blogs" className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <BlogsSection />
      </section>

      <section id="about-us" className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <BlogsSection />
      </section>

      <section id="media" className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <BlogsSection />
      </section>

    </div>
  );
};

export default HomePage;