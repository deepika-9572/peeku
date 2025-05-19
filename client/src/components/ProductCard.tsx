import { Link } from "wouter";
import { ProductType } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductType;
  showDetails?: (product: ProductType) => void;
}

const ProductCard = ({ product, showDetails }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };
  
  const handleCardClick = () => {
    if (showDetails) {
      showDetails(product);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden card-shadow cursor-pointer" 
      data-product-id={product.id}
      onClick={handleCardClick}
    >
      <Link href={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-heading text-lg font-medium">{product.name}</h3>
            <span className="bg-secondary text-accent px-2 py-1 rounded text-sm">
              {formatCurrency(product.price)}
            </span>
          </div>
          <p className="text-neutral-600 text-sm mt-2">{product.shortDescription}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
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
                {product.rating.toFixed(1)} ({product.reviews.length})
              </span>
            </div>
            <button 
              onClick={handleAddToCart}
              className="text-primary hover:text-primaryDark"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
