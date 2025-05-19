import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { FaTimes, FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const CartSidebar = () => {
  const { cart, updateQuantity, removeItem, hideCart, isCartOpen } = useCart();
  const [, setLocation] = useLocation();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    hideCart();
    setLocation("/checkout");
  };

  return (
    <div id="cart-sidebar" className={`fixed inset-y-0 right-0 bg-white w-full max-w-md shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="font-heading text-xl">Your Cart</h2>
          <button onClick={hideCart} className="text-neutral-500 hover:text-neutral-800 p-2">
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-4 space-y-4" id="cart-items">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <FaShoppingCart className="text-4xl text-neutral-300 mb-3 mx-auto" />
              <p className="text-neutral-500">Your cart is empty</p>
              <Link href="/menu" onClick={hideCart} className="mt-4 inline-block text-primary hover:text-primaryDark">
                Browse our menu
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size || 'default'}`} className="flex border-b border-neutral-200 pb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded mr-3"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id, item.size)} 
                      className="text-neutral-400 hover:text-error transition-colors"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                  {item.size && <p className="text-sm text-neutral-600">{item.size}</p>}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex border border-neutral-300 rounded overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)} 
                        disabled={item.quantity <= 1}
                        className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 transition-colors text-xs disabled:opacity-50"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        readOnly
                        min="1" 
                        className="w-8 text-center px-1 py-0.5 border-0 focus:outline-none text-sm"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)} 
                        className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 transition-colors text-xs"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium text-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t border-neutral-200">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Delivery Fee</span>
                <span className="font-medium">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200">
                <span className="font-medium">Total</span>
                <span className="font-medium text-primary text-xl">{formatCurrency(total)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primaryDark text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
