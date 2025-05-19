import { useState, useEffect } from "react";
import { ProductType } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { FaStar, FaRegStar, FaChevronRight } from "react-icons/fa";

const ProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Make the component available globally
    window.showProductModal = (product: ProductType) => {
      setSelectedProduct(product);
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0].name : "");
      setQuantity(1);
      setIsVisible(true);
    };

    return () => {
      // Clean up
      window.showProductModal = undefined as any;
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    
    // Add to cart first
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: getSizePrice(),
      image: selectedProduct.images[0],
      quantity,
      size: selectedSize || undefined
    });
    
    // Close the product modal
    closeModal();
    
    // Show the order processing modal
    const processingModal = document.getElementById("order-processing-modal");
    if (processingModal) {
      processingModal.classList.remove("hidden");
      
      const processingState = document.getElementById("processing-state");
      const successState = document.getElementById("success-state");
      
      if (processingState && successState) {
        processingState.classList.remove("hidden");
        successState.classList.add("hidden");
        
        // Simulate processing time
        setTimeout(() => {
          processingState.classList.add("hidden");
          successState.classList.remove("hidden");
        }, 3000);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: getSizePrice(),
      image: selectedProduct.images[0],
      quantity,
      size: selectedSize || undefined
    });
    
    closeModal();
  };

  const getSizePrice = () => {
    if (!selectedProduct) return 0;
    
    if (!selectedProduct.sizes || selectedProduct.sizes.length === 0) {
      return selectedProduct.price;
    }
    
    const sizeObj = selectedProduct.sizes.find(s => s.name === selectedSize);
    return sizeObj ? sizeObj.price : selectedProduct.price;
  };

  if (!selectedProduct) return null;

  return (
    <div 
      id="product-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isVisible ? '' : 'hidden'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <img 
              id="product-image" 
              src={selectedImage} 
              alt={selectedProduct.name} 
              className="w-full h-auto rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {selectedProduct.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${selectedProduct.name} thumbnail ${index + 1}`} 
                  className={`w-full h-16 object-cover rounded cursor-pointer ${
                    selectedImage === img ? 'border-2 border-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h2 id="product-title" className="font-heading text-2xl font-medium">
                {selectedProduct.name}
              </h2>
              <button onClick={closeModal} id="close-product-modal" className="text-neutral-500 hover:text-neutral-800">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-accent">
                {Array.from({ length: Math.floor(selectedProduct.rating) }).map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {selectedProduct.rating % 1 > 0 && <i className="fas fa-star-half-alt"></i>}
                {Array.from({ length: 5 - Math.ceil(selectedProduct.rating) }).map((_, i) => (
                  <i key={`empty-${i}`} className="far fa-star"></i>
                ))}
              </span>
              <span className="text-sm text-neutral-500 ml-1">
                {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviews.length} reviews)
              </span>
            </div>
            <div className="mt-4">
              <span id="product-price" className="text-2xl font-medium text-primary">
                {formatCurrency(getSizePrice())}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p id="product-description" className="text-neutral-700">
                {selectedProduct.description}
              </p>
            </div>
            
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button 
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size.name 
                          ? 'border-primary bg-primary bg-opacity-10 font-medium' 
                          : 'border-neutral-300 hover:border-primary'
                      }`}
                    >
                      {size.name} ({formatCurrency(size.price)})
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <div className="flex items-center">
                <span className="mr-3">Quantity:</span>
                <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                  <button 
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    min="1" 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-12 text-center px-2 py-1 border-0 focus:outline-none"
                  />
                  <button 
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button 
                id="add-to-cart" 
                className="flex-1 bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                id="buy-now-button" 
                className="flex-1 bg-accent hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-neutral-200">
          <h3 className="font-heading text-xl mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {selectedProduct.reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="border-b border-neutral-200 pb-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full overflow-hidden mr-3">
                      <img 
                        src={review.avatar || "https://ui-avatars.com/api/?name=" + review.name} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="text-accent text-xs">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FaStar key={i} className="text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, i) => (
                          <FaRegStar key={`empty-${i}`} className="text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">{review.date}</span>
                </div>
                <p className="mt-2 text-neutral-700">{review.comment}</p>
              </div>
            ))}
            
            {selectedProduct.reviews.length > 2 && (
              <div className="mt-4">
                <a href="#" className="text-primary hover:text-primaryDark font-medium flex items-center">
                  <span>See all {selectedProduct.reviews.length} reviews</span>
                  <FaChevronRight className="ml-1 text-sm" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add type definition for global window object
declare global {
  interface Window {
    showProductModal: (product: ProductType) => void;
  }
}

export default ProductModal;
