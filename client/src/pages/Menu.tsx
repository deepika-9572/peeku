import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductType, getAllProducts } from "@/data/mockData";
import { useLocation } from "wouter";

const Menu = () => {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Items" },
    { id: "breads", name: "Breads" },
    { id: "pastries", name: "Pastries" },
    { id: "cakes", name: "Cakes" },
    { id: "desserts", name: "Desserts" },
    { id: "seasonal", name: "Seasonal Specials" }
  ];

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);

    // Check if there's a category query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [activeCategory, products, searchTerm]);

  const showProductDetails = (product: ProductType) => {
    if (window.showProductModal) {
      window.showProductModal(product);
    }
  };

  return (
    <div className="py-8 bg-neutral-100 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl mb-2">Our Menu</h1>
        <p className="text-neutral-600 mb-8">
          Discover our delicious range of freshly baked goods
        </p>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search our menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-search text-4xl text-neutral-300 mb-3"></i>
            <h3 className="font-heading text-xl mb-2">No products found</h3>
            <p className="text-neutral-600">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                showDetails={showProductDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
