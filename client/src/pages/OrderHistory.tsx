import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrdersByUserId, OrderType } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load orders
  useEffect(() => {
    // Get all orders - using userId 1 as default
    const userOrders = getOrdersByUserId(1).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setOrders(userOrders);
    setFilteredOrders(userOrders);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Filter orders when tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === activeTab));
    }
  }, [activeTab, orders]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full loader mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-heading text-3xl mb-6">Order History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>View and track all your past orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="out_for_delivery">Out for Delivery</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <i className="fas fa-shopping-bag text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No Orders Found</h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "all" 
                      ? "You haven't placed any orders yet." 
                      : `You don't have any ${activeTab.replace('_', ' ')} orders.`}
                  </p>
                  <Link href="/order-history">
                    <Button>View Your Orders</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="font-medium">Order #{order.id}</span>
                          <span className="text-sm text-gray-500 ml-3">
                            {formatDate(order.date)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <Link href={`/order-tracking/${order.id}`}>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <i className="fas fa-arrow-right"></i>
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-start">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 rounded object-cover mr-3"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x {formatCurrency(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap justify-between items-center pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-sm text-gray-500">Delivered to: <span className="text-gray-700">{order.deliveryAddress}</span></p>
                            <p className="text-sm text-gray-500">Payment: <span className="text-gray-700">{order.paymentMethod}</span></p>
                          </div>
                          <div className="flex items-center mt-4 sm:mt-0">
                            <p className="text-gray-700 mr-4">
                              Total: <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
                            </p>
                            <Link href={`/order-tracking/${order.id}`}>
                              <Button variant="outline" size="sm">
                                {order.status === 'delivered' ? 'View Details' : 'Track Order'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
