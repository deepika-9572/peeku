import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { getAllOrders } from "@/data/mockData";
import { FaCheck } from "react-icons/fa";

const OrderProcessingModal = () => {
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [, navigate] = useLocation();
  const { clearCart } = useCart();

  useEffect(() => {
    // Get a valid order ID from the existing orders
    const getValidOrderId = () => {
      const orders = getAllOrders();
      // If there are orders, return one of their IDs, otherwise use a default
      return orders.length > 0 ? orders[Math.floor(Math.random() * orders.length)].id : "DB12345";
    };

    // Generate an estimated delivery time (30-60 minutes from now)
    const generateDeliveryTime = () => {
      const now = new Date();
      const deliveryStart = new Date(now.getTime() + 30 * 60000); // 30 minutes later
      const deliveryEnd = new Date(now.getTime() + 60 * 60000); // 60 minutes later
      
      const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutesStr} ${ampm}`;
      };
      
      return `Today, ${formatTime(deliveryStart)} - ${formatTime(deliveryEnd)}`;
    };

    // Make the component available globally
    window.showOrderProcessingModal = () => {
      setOrderId(getValidOrderId());
      setEstimatedDelivery(generateDeliveryTime());
      setIsProcessing(true);
      setIsVisible(true);
      
      // Simulate processing time (3 seconds)
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    };

    return () => {
      // Clean up
      window.showOrderProcessingModal = undefined as any;
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleTrackOrder = () => {
    setIsVisible(false);
    // Use setTimeout to ensure the modal is closed before navigation
    setTimeout(() => {
      navigate(`/order-tracking/${orderId}`);
    }, 100);
  };

  const handleContinueShopping = () => {
    setIsVisible(false);
    clearCart();
    // Use setTimeout to ensure the modal is closed before navigation
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div 
      id="order-processing-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isVisible ? '' : 'hidden'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          closeModal();
        }
      }}
    >
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center">
        <div id="processing-state" className={isProcessing ? '' : 'hidden'}>
          <div className="w-16 h-16 mx-auto border-4 border-neutral-200 border-t-primary rounded-full loader mb-4"></div>
          <h3 className="font-heading text-2xl mb-2">Processing Your Order</h3>
          <p className="text-neutral-600">Please wait while we confirm your order...</p>
        </div>
        
        <div id="success-state" className={isProcessing ? 'hidden' : ''}>
          <div className="w-16 h-16 mx-auto bg-success bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-2xl text-success" />
          </div>
          <h3 className="font-heading text-2xl mb-2">Order Confirmed!</h3>
          <p className="text-neutral-600 mb-6">Your order has been placed successfully.</p>
          <div className="space-y-4">
            <div className="bg-neutral-100 rounded-lg p-3">
              <p className="font-medium mb-1">Order #{orderId}</p>
              <p className="text-sm text-neutral-600">Estimated delivery: {estimatedDelivery}</p>
            </div>
            <button 
              id="track-order-button" 
              onClick={handleTrackOrder}
              className="w-full bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Track Order
            </button>
            <button 
              id="continue-shopping-button" 
              onClick={handleContinueShopping}
              className="w-full border border-primary text-primary hover:bg-secondary px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add type definition for global window object
declare global {
  interface Window {
    showOrderProcessingModal: () => void;
  }
}

export default OrderProcessingModal;
