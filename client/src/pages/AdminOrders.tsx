import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllOrders, OrderType } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AdminOrders = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      setLocation("/");
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // Load orders
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      const allOrders = getAllOrders();
      setOrders(allOrders);
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isAuthenticated, isAdmin]);

  // Filter and sort orders
  useEffect(() => {
    let result = [...orders];
    
    // Filter by status
    if (activeTab !== "all") {
      result = result.filter(order => order.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        order => order.id.toLowerCase().includes(term)
      );
    }
    
    // Sort orders
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "highest") {
        return b.totalAmount - a.totalAmount;
      } else {
        return a.totalAmount - b.totalAmount;
      }
    });
    
    setFilteredOrders(result);
  }, [activeTab, orders, searchTerm, sortOrder]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Update order status (in a real app, this would make an API call)
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        // Simulate updating the tracking steps as well
        const trackingSteps = [...order.trackingSteps];
        
        if (newStatus === "processing") {
          trackingSteps[1] = { ...trackingSteps[1], completed: true, time: new Date().toLocaleString() };
        } else if (newStatus === "out_for_delivery") {
          trackingSteps[1] = { ...trackingSteps[1], completed: true, time: trackingSteps[1].time || new Date().toLocaleString() };
          trackingSteps[2] = { ...trackingSteps[2], completed: true, time: new Date().toLocaleString() };
        } else if (newStatus === "delivered") {
          trackingSteps[1] = { ...trackingSteps[1], completed: true, time: trackingSteps[1].time || new Date().toLocaleString() };
          trackingSteps[2] = { ...trackingSteps[2], completed: true, time: trackingSteps[2].time || new Date().toLocaleString() };
          trackingSteps[3] = { ...trackingSteps[3], completed: true, time: new Date().toLocaleString() };
          trackingSteps[4] = { ...trackingSteps[4], completed: true, time: new Date().toLocaleString() };
        }
        
        return {
          ...order,
          status: newStatus,
          trackingSteps
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    toast({
      title: "Order Updated",
      description: `Order #${orderId} status changed to ${newStatus.replace('_', ' ').toUpperCase()}`,
      variant: "success"
    });
  };

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

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full loader mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl mb-2">Manage Orders</h1>
          <p className="text-gray-600">View and update customer orders</p>
        </div>
        <Link href="/admin">
          <Button variant="outline">
            <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="out_for_delivery">Out for Delivery</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <i className="fas fa-box-open text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No Orders Found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? "Try using different search terms or filters" 
                      : `No ${activeTab !== "all" ? activeTab.replace('_', ' ') : ''} orders found`}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Items</th>
                        <th className="text-left py-3 px-4 font-medium">Total</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-medium text-primary">#{order.id}</span>
                          </td>
                          <td className="py-3 px-4 text-sm">{formatDate(order.date)}</td>
                          <td className="py-3 px-4">
                            {order.userId === 1 ? "Test User" : "Unknown"}
                            <div className="text-xs text-gray-500">{order.deliveryAddress}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{formatCurrency(order.totalAmount)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                              {order.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Link href={`/order-tracking/${order.id}`}>
                                <Button variant="ghost" size="sm">
                                  <i className="fas fa-eye"></i>
                                </Button>
                              </Link>
                              
                              {order.status !== "delivered" && order.status !== "cancelled" && (
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Update Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
