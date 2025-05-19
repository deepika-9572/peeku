import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatCurrency, generateOrderId } from "@/lib/utils";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart, clearCart } = useCart();
  const [, setLocation] = useLocation();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50; // Fixed delivery fee
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      setLocation("/menu");
    }
  }, [cart, setLocation]);

  // Populate form if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name);
      setEmail("testuser@example.com"); // Mock data
      setPhone("+91 9876543210"); // Mock data
      setAddress("123 Main St, Mumbai 400001"); // Mock data
    }
  }, [isAuthenticated, user]);

  // Validate form
  useEffect(() => {
    if (name && phone && email && address && paymentMethod) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, phone, email, address, paymentMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setLoading(true);
    
    // Generate a random order ID
    const orderId = generateOrderId();
    
    // Simulate API call to place order
    setTimeout(() => {
      // Show order processing modal
      if (window.showOrderProcessingModal) {
        window.showOrderProcessingModal();
      }
      
      // Clear the cart
      clearCart();
      
      // Reset loading state
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-heading text-3xl mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Information */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Enter your contact and delivery details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Your full delivery address"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    placeholder="Special instructions for delivery or order"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center">
                      <i className="fas fa-credit-card mr-2 text-gray-600"></i>
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center">
                      <i className="fas fa-mobile-alt mr-2 text-gray-600"></i>
                      UPI Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center">
                      <i className="fas fa-money-bill-wave mr-2 text-gray-600"></i>
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <div className="lg:hidden mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{cart.length} items in your cart</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size || 'default'}`} className="flex border-b pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.size && <p className="text-sm text-gray-500">{item.size}</p>}
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>{formatCurrency(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-primary text-lg">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <>
                  <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                `Place Order - ${formatCurrency(total)}`
              )}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="hidden lg:block">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{cart.length} items in your cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size || 'default'}`} className="flex border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.size && <p className="text-sm text-gray-500">{item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary text-lg">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
