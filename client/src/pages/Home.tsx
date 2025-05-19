import { useEffect, useState } from "react";
import { Link } from "wouter";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { ProductType } from "@/data/mockData";
import { getAllProducts } from "@/data/mockData";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  
  useEffect(() => {
    // Get all products and filter for featured ones
    const products = getAllProducts();
    setFeaturedProducts(
      products
        .filter(product => product.featured)
        .slice(0, 4)
    );
  }, []);

  const showProductDetails = (product: ProductType) => {
    if (window.showProductModal) {
      window.showProductModal(product);
    }
  };

  return (
    <>
      <Hero />
      <CategorySection />
      
      <section id="menu" className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl">Popular Items</h2>
            <div className="flex space-x-2">
              <button className="bg-white hover:bg-secondary text-primary rounded-lg p-2">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="bg-white hover:bg-secondary text-primary rounded-lg p-2">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                showDetails={showProductDetails}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/menu">
              <button className="bg-white border border-primary text-primary hover:bg-secondary px-6 py-2 rounded-lg font-medium transition-colors">
                View All Menu
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="about" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450" 
                alt="Peeku's Bakery interior" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="font-heading text-3xl mb-4">Our Story</h2>
              <p className="text-neutral-700 mb-4">
                Peeku's Bakery was founded in 2015 with a simple mission: to bring the joy of 
                freshly baked goods to our community. What started as a small passion project has 
                grown into the beloved bakery you see today.
              </p>
              <p className="text-neutral-700 mb-6">
                Every item is crafted with love using traditional techniques and the finest ingredients. 
                We believe in the power of good food to bring people together and create moments of happiness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <div className="bg-secondary rounded-full p-3 mr-3">
                    <i className="fas fa-medal text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Premium Quality</h4>
                    <p className="text-sm text-neutral-600">Finest ingredients</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-secondary rounded-full p-3 mr-3">
                    <i className="fas fa-heart text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Made with Love</h4>
                    <p className="text-sm text-neutral-600">Crafted by hand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Priya Sharma</h4>
                  <div className="text-accent text-sm">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-neutral-700">
                "The chocolate cake is to die for! Every bite is pure bliss. Peeku's Bakery has become my go-to place for all celebrations."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Rahul Patel</h4>
                  <div className="text-accent text-sm">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <p className="text-neutral-700">
                "Their sourdough bread is exceptional! Perfect crust and amazing flavor. I've tried many bakeries but none compare to Peeku's artisanal bread."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sneha Gupta</h4>
                  <div className="text-accent text-sm">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-neutral-700">
                "The pastries are always fresh and delicious. The attention to detail is impressive and the staff is always friendly. A hidden gem in our neighborhood!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Home;
