import { useEffect, useState, useCallback } from "react";
import { useRoute, Link } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { ProductType, getProductById, getRelatedProducts } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const [, params] = useRoute("/product/:id");
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params && params.id) {
      const productId = parseInt(params.id);
      const fetchedProduct = getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0].name);
        }
        
        // Get related products
        const related = getRelatedProducts(productId);
        setRelatedProducts(related);
      }
    }
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [params]);

  // Memoize this function to prevent it from causing re-renders
  const showProductDetails = useCallback((productToShow: ProductType) => {
    if (window.showProductModal) {
      window.showProductModal(productToShow);
    }
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: getSizePrice(),
      image: product.images[0],
      quantity,
      size: selectedSize || undefined
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    handleAddToCart();
    
    if (window.showOrderProcessingModal) {
      window.showOrderProcessingModal();
    }
  };

  const getSizePrice = () => {
    if (!product) return 0;
    
    if (!product.sizes || product.sizes.length === 0) {
      return product.price;
    }
    
    const sizeObj = product.sizes.find(s => s.name === selectedSize);
    return sizeObj ? sizeObj.price : product.price;
  };

  if (isLoading) {
    return (
      <div className="py-12 container mx-auto px-4 flex justify-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for could not be found.</p>
        <Link href="/menu">
          <button className="bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Back to Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-neutral-100">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-6 text-sm">
          <Link href="/" className="text-neutral-500 hover:text-primary">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/menu" className="text-neutral-500 hover:text-primary">Menu</Link>
          <span className="mx-2">›</span>
          <Link href={`/menu?category=${product.category}`} className="text-neutral-500 hover:text-primary capitalize">
            {product.category}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-neutral-800">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <img 
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className={`w-full h-16 object-cover rounded cursor-pointer ${
                      selectedImage === img ? 'border-2 border-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <h1 className="font-heading text-3xl mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-accent">
                  {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {product.rating % 1 > 0 && <i className="fas fa-star-half-alt"></i>}
                  {Array.from({ length: 5 - Math.ceil(product.rating) }).map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star"></i>
                  ))}
                </span>
                <span className="text-sm text-neutral-500 ml-1">
                  {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-medium text-primary">
                  {formatCurrency(getSizePrice())}
                </span>
              </div>

              <p className="text-neutral-700 mb-6">{product.description}</p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
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

              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
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

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primaryDark text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-accent hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="font-heading text-2xl mb-6">Customer Reviews</h2>
          
          {product.reviews.length === 0 ? (
            <p className="text-neutral-600">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className={index < product.reviews.length - 1 ? "border-b border-neutral-200 pb-6" : ""}>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden mr-3">
                        <img 
                          src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}`} 
                          alt={review.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="text-accent text-sm">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                          {Array.from({ length: 5 - review.rating }).map((_, i) => (
                            <i key={`empty-${i}`} className="far fa-star"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-neutral-500">{review.date}</span>
                  </div>
                  <p className="mt-2 text-neutral-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  showDetails={showProductDetails}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
