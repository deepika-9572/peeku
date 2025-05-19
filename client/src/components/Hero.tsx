import { Link } from "wouter";
import { useEffect, useState } from "react";
import { FaBirthdayCake, FaCookieBite, FaBreadSlice, FaIceCream, FaChild } from "react-icons/fa";
import { GiCupcake, GiDonut, GiCroissant, GiSlicedBread } from "react-icons/gi";
import { PiBreadFill } from "react-icons/pi";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    "https://images.unsplash.com/photo-1464195244916-405fa0a82545?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section 
      id="home" 
      className="hero-section relative h-[600px] flex items-center justify-center text-white text-center overflow-hidden"
    >
      {/* Background image carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${image}')`
            }}
          />
        ))}
      </div>

      {/* Floating Bakery Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Teddy Bear Icon (using Child icon as substitute) */}
        <div className="absolute top-[15%] left-[10%] text-white text-4xl animate-bounce-slow opacity-80">
          <FaChild className="transform rotate-12 drop-shadow-lg" />
        </div>
        
        {/* Cake Icon */}
        <div className="absolute top-[25%] right-[15%] text-white text-3xl animate-float-delayed opacity-80">
          <FaBirthdayCake className="transform -rotate-12 drop-shadow-lg" />
        </div>
        
        {/* Cupcake Icon */}
        <div className="absolute bottom-[30%] left-[20%] text-white text-3xl animate-pulse-slow opacity-80">
          <GiCupcake className="transform rotate-6 drop-shadow-lg" />
        </div>
        
        {/* Cookie Icon */}
        <div className="absolute top-[40%] left-[30%] text-white text-2xl animate-spin-slow opacity-70">
          <FaCookieBite className="drop-shadow-lg" />
        </div>
        
        {/* Donut Icon */}
        <div className="absolute top-[60%] right-[25%] text-white text-3xl animate-float opacity-80">
          <GiDonut className="transform rotate-45 drop-shadow-lg" />
        </div>
        
        {/* Bread Icon */}
        <div className="absolute bottom-[20%] right-[10%] text-white text-2xl animate-bounce-delayed opacity-70">
          <FaBreadSlice className="transform -rotate-12 drop-shadow-lg" />
        </div>
        
        {/* Croissant Icon */}
        <div className="absolute top-[10%] right-[35%] text-white text-2xl animate-pulse-delayed opacity-70">
          <GiCroissant className="transform rotate-12 drop-shadow-lg" />
        </div>
        
        {/* Ice Cream Icon */}
        <div className="absolute bottom-[35%] right-[30%] text-white text-2xl animate-float-slow opacity-70">
          <FaIceCream className="transform -rotate-6 drop-shadow-lg" />
        </div>
        
        {/* Bread Loaf Icon */}
        <div className="absolute bottom-[15%] left-[35%] text-white text-3xl animate-bounce-slow opacity-80">
          <PiBreadFill className="transform rotate-6 drop-shadow-lg" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 animate-fadeIn">
        <h1 className="font-script text-5xl md:text-7xl mb-2 text-shadow-lg animate-slideUp">Peeku's Bakery</h1>
        <p className="font-heading text-xl md:text-2xl mb-8 text-shadow-sm animate-slideUp animation-delay-200">Artisanal Baked Goods Made With Love</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slideUp animation-delay-400">
          <Link href="/menu">
            <button className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
              Order Now
            </button>
          </Link>
          <Link href="/menu">
            <button className="bg-white hover:bg-neutral-100 text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View Menu
            </button>
          </Link>
        </div>

        {/* Image indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

// Add these styles to your tailwind.config.js or create a new CSS file
// and import it in your main CSS file
/*
extend: {
  animation: {
    'float': 'float 6s ease-in-out infinite',
    'float-slow': 'float 8s ease-in-out infinite',
    'float-delayed': 'float 6s ease-in-out 2s infinite',
    'bounce-slow': 'bounce 3s ease-in-out infinite',
    'bounce-delayed': 'bounce 3s ease-in-out 1s infinite',
    'spin-slow': 'spin 8s linear infinite',
    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'pulse-delayed': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) 1.5s infinite',
  },
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  },
}
*/
