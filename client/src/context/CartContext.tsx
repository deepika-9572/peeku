import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

type CartContextType = {
  cart: CartItem[];
  isCartOpen: boolean;
  showCart: () => void;
  hideCart: () => void;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number, size?: string) => void;
  removeItem: (id: number, size?: string) => void;
  clearCart: () => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  isCartOpen: false,
  showCart: () => {},
  hideCart: () => {},
  toggleCart: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  resetCart: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Show/hide cart methods
  const showCart = useCallback(() => setIsCartOpen(true), []);
  const hideCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  // Add item to cart
  const addToCart = useCallback((item: CartItem) => {
    setCart(prevCart => {
      // Check if the item is already in the cart with the same size
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex >= 0) {
        // If item exists, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        // Otherwise, add new item
        return [...prevCart, item];
      }
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      variant: "success"
    });
  }, [toast]);

  // Update quantity of an item
  const updateQuantity = useCallback((id: number, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((id: number, size?: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id && item.size === size);
      const newCart = prevCart.filter(item => !(item.id === id && item.size === size));
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} has been removed from your cart.`,
          variant: "default"
        });
      }
      
      return newCart;
    });
  }, [toast]);

  // Clear cart completely
  const clearCart = useCallback(() => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      variant: "default"
    });
  }, [toast]);

  // Reset cart with initial mock items (for demo purposes)
  const resetCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        showCart,
        hideCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};
