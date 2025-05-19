import Newsletter from "@/components/Newsletter";
import { useEffect, useRef } from "react";

const About = () => {
  const observerRefs = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      observerRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current.push(el);
    }
  };
  return (
    <>
      <section className="relative h-[400px] overflow-hidden bg-cover bg-center flex items-center justify-center">
        {/* Background image with parallax effect */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-110" 
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')"
          }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black opacity-30"></div>
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary opacity-10 rounded-full blur-xl animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary opacity-10 rounded-full blur-xl animate-float-delayed"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-black bg-opacity-20 backdrop-blur-sm p-10 rounded-xl inline-block">
            <h1 
              ref={addToRefs} 
              className="font-script text-6xl mb-6 transform transition-all duration-700 opacity-0 translate-y-10 animate-fade-in text-white text-shadow-xl"
            >
              About Peeku's Bakery
            </h1>
            <div className="w-32 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p 
              ref={addToRefs} 
              className="max-w-2xl mx-auto text-xl text-white text-shadow-sm transform transition-all duration-700 delay-300 opacity-0 translate-y-10 animate-fade-in"
            >
              Our journey of creating delicious moments and sweet memories
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div 
              ref={addToRefs} 
              className="lg:w-1/2 transform transition-all duration-700 opacity-0 translate-x-[-50px] animate-fade-in shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Bakery counter with various pastries" 
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div 
              ref={addToRefs} 
              className="lg:w-1/2 transform transition-all duration-700 opacity-0 translate-x-[50px] animate-fade-in"
            >
              <h2 className="font-heading text-4xl mb-6 relative inline-block">
                Our Story
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-neutral-700 mb-5 leading-relaxed">
                Peeku's Bakery was founded in 2015 by Deepika Suman, a passionate baker with a vision to create 
                artisanal baked goods that would bring joy to people's everyday lives. What started as a small 
                home kitchen operation has now grown into a beloved neighborhood bakery.
              </p>
              <p className="text-neutral-700 mb-5 leading-relaxed">
                After years of perfecting recipes passed down through generations and studying modern baking techniques,
                Deepika decided to share her creations with the world. Her philosophy was simple: use the finest ingredients,
                bake with love, and create products that make people smile.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Today, Peeku's Bakery is known for its commitment to quality, innovation, and the warm, inviting atmosphere
                that makes every customer feel like family.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div 
              ref={addToRefs} 
              className="lg:w-1/2 transform transition-all duration-700 opacity-0 translate-x-[-50px] animate-fade-in"
            >
              <h2 className="font-heading text-4xl mb-6 relative inline-block">
                Our Mission
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-neutral-700 mb-5 leading-relaxed">
                At Peeku's Bakery, our mission is to create exceptional baked goods that bring people together and create 
                memorable moments. We believe in the power of food to connect communities and celebrate life's special occasions.
              </p>
              <p className="text-neutral-700 mb-5 leading-relaxed">
                We are committed to sourcing ingredients responsibly, supporting local farmers and suppliers whenever possible,
                and minimizing our environmental impact through sustainable practices.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Every day, we strive to exceed our customers' expectations by consistently delivering products of the highest 
                quality and providing friendly, attentive service that makes everyone feel welcome.
              </p>
            </div>
            <div 
              ref={addToRefs} 
              className="lg:w-1/2 transform transition-all duration-700 opacity-0 translate-x-[50px] animate-fade-in shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Freshly baked bread" 
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-100 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 
            ref={addToRefs} 
            className="font-heading text-4xl text-center mb-12 relative inline-block transform transition-all duration-700 opacity-0 translate-y-10 animate-fade-in mx-auto"
          >
            <span className="relative">Meet Our Team
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={addToRefs} 
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary border-opacity-20 group-hover:border-opacity-60 transition-all duration-300 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Deepika Suman" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors duration-300">Deepika Suman</h3>
              <p className="text-primary font-medium mb-4 inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full">Founder & Head Baker</p>
              <p className="text-neutral-600 leading-relaxed">
                Deepika is the creative force behind our bakery, with over 15 years of experience in creating exquisite baked goods that delight our customers.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden delay-100"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary border-opacity-20 group-hover:border-opacity-60 transition-all duration-300 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Channaveer" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors duration-300">Channaveer</h3>
              <p className="text-primary font-medium mb-4 inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full">Pastry Chef</p>
              <p className="text-neutral-600 leading-relaxed">
                A graduate of Le Cordon Bleu, Channaveer brings his expertise in French pastry techniques to create our delicate and exquisite desserts.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden delay-200"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary border-opacity-20 group-hover:border-opacity-60 transition-all duration-300 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Darshan" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors duration-300">Darshan</h3>
              <p className="text-primary font-medium mb-4 inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full">Bread Specialist</p>
              <p className="text-neutral-600 leading-relaxed">
                Darshan is passionate about artisanal bread, cultivating our sourdough starters and perfecting our bread recipes with innovative techniques.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden delay-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary border-opacity-20 group-hover:border-opacity-60 transition-all duration-300 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Shashank" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors duration-300">Shashank</h3>
              <p className="text-primary font-medium mb-4 inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full">Cake Decorator</p>
              <p className="text-neutral-600 leading-relaxed">
                Shashank brings artistic flair to our bakery, creating stunning cake designs and decorations that transform our desserts into edible works of art.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-secondary relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent opacity-10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent opacity-10 rounded-full"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 
            ref={addToRefs} 
            className="font-heading text-4xl mb-8 relative inline-block transform transition-all duration-700 opacity-0 translate-y-10 animate-fade-in"
          >
            <span className="relative">Our Commitment to Quality
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
            </span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p 
              ref={addToRefs} 
              className="mb-8 text-lg transform transition-all duration-700 opacity-0 translate-y-10 animate-fade-in"
            >
              At Peeku's Bakery, quality is at the heart of everything we do. We believe that exceptional baked goods 
              start with exceptional ingredients. That's why we use:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div 
                ref={addToRefs} 
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group"
              >
                <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300 transform group-hover:scale-110">
                  <i className="fas fa-seedling text-primary text-2xl"></i>
                </div>
                <h3 className="font-medium text-lg mb-3 group-hover:text-primary transition-colors duration-300">Organic Ingredients</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We prioritize organic flour, eggs, and dairy products for better flavor and sustainability in all our creations.
                </p>
              </div>
              
              <div 
                ref={addToRefs} 
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group delay-100"
              >
                <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300 transform group-hover:scale-110">
                  <i className="fas fa-hands text-primary text-2xl"></i>
                </div>
                <h3 className="font-medium text-lg mb-3 group-hover:text-primary transition-colors duration-300">Handcrafted Daily</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Every item is made by hand daily to ensure the freshest and most delicious products for our valued customers.
                </p>
              </div>
              
              <div 
                ref={addToRefs} 
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in hover:shadow-xl hover:-translate-y-2 group delay-200"
              >
                <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300 transform group-hover:scale-110">
                  <i className="fas fa-heart text-primary text-2xl group-hover:animate-pulse"></i>
                </div>
                <h3 className="font-medium text-lg mb-3 group-hover:text-primary transition-colors duration-300">Made with Love</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We believe that passion and care are essential ingredients in everything we create, making each bite special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default About;
