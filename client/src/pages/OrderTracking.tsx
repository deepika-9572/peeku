import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getOrderById, OrderType, OrderItemType } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const OrderTracking = () => {
  const [, params] = useRoute("/order-tracking/:id");
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (params && params.id) {
      const orderData = getOrderById(params.id);
      
      if (orderData) {
        setOrder(orderData);
        // Find the current step
        const lastCompletedStepIndex = orderData.trackingSteps.findIndex(step => !step.completed);
        setCurrentStep(lastCompletedStepIndex === -1 ? orderData.trackingSteps.length : lastCompletedStepIndex);
      }
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full loader mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
        </div>
        <h2 className="text-2xl font-heading mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button variant="outline">Browse Menu</Button>
          </Link>
          {isAuthenticated && (
            <Link href="/order-history">
              <Button>View Your Orders</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-heading text-3xl mb-2">Track Your Order</h1>
      <p className="text-gray-600 mb-6">Order #{order.id} • Placed on {formatDate(order.date)}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Tracking */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Status</CardTitle>
              <CardDescription>
                Estimated delivery: {order.estimatedDelivery}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200"></div>
                
                {/* Steps */}
                <div className="space-y-8 relative">
                  {order.trackingSteps.map((step, index) => (
                    <div key={index} className="ml-10 relative">
                      {/* Step dot */}
                      <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-primary text-white' 
                          : index === currentStep 
                            ? 'border-2 border-primary bg-white text-primary' 
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className={`fas ${
                            step.step === "Order Placed" ? "fa-shopping-cart" :
                            step.step === "Order Confirmed" ? "fa-check-circle" :
                            step.step === "Preparation Started" ? "fa-cookie" :
                            step.step === "Out for Delivery" ? "fa-truck" :
                            "fa-home"
                          }`}></i>
                        )}
                      </div>
                      
                      {/* Step content */}
                      <div>
                        <h3 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 
                          index === currentStep ? 'text-primary' : 'text-gray-500'
                        }`}>
                          {step.step}
                        </h3>
                        {step.time && (
                          <p className="text-sm text-gray-500">{step.time}</p>
                        )}
                        {!step.completed && index === currentStep && (
                          <div className="mt-2">
                            <p className="text-sm text-primary">In progress...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {order.status === 'delivered' && (
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <i className="fas fa-check text-green-500 text-xl"></i>
                  </div>
                  <h3 className="font-heading text-xl mb-2">Order Delivered!</h3>
                  <p className="text-gray-600 mb-4">Thank you for ordering from Peeku's Bakery.</p>
                  <Link href="/menu">
                    <Button>Order Again</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: OrderItemType) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4">
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
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(order.totalAmount - 50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{formatCurrency(50)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Delivery Details</h4>
                  <p className="text-sm text-gray-600 mb-1">{order.deliveryAddress}</p>
                  <p className="text-sm text-gray-600 mb-1">Payment: {order.paymentMethod}</p>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-headset mr-2"></i> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
