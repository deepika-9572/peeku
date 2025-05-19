import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrdersByUserId, OrderType } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FaUser, FaClipboardList, FaLock, FaTruck } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("testuser@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [address, setAddress] = useState("123 Main St, Mumbai 400001");
  const [recentOrders, setRecentOrders] = useState<OrderType[]>([]);
  const { toast } = useToast();

  // Load mock user details and orders
  useEffect(() => {
    // Load recent orders for user ID 1
    try {
      const orders = getOrdersByUserId(1).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, 3);
      
      setRecentOrders(orders);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      variant: "success"
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
      variant: "success"
    });
  };

  // Mock user is always available

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-heading text-3xl mb-6">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium">{name.charAt(0)}</span>
                </div>
                <div>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription className="text-sm">Customer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button 
                  variant={activeTab === "profile" ? "default" : "outline"} 
                  onClick={() => setActiveTab("profile")}
                  className="w-full justify-start"
                >
                  <FaUser className="mr-2" /> Profile
                </Button>
                <Button 
                  variant={activeTab === "orders" ? "default" : "outline"} 
                  onClick={() => setActiveTab("orders")}
                  className="w-full justify-start"
                >
                  <FaClipboardList className="mr-2" /> Recent Orders
                </Button>
                <Button 
                  variant={activeTab === "password" ? "default" : "outline"} 
                  onClick={() => setActiveTab("password")}
                  className="w-full justify-start"
                >
                  <FaLock className="mr-2" /> Change Password
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} defaultValue="profile">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Your name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Your email" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Your phone number" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <label htmlFor="address" className="text-sm font-medium">Address</label>
                      <Input 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        placeholder="Your address" 
                      />
                    </div>
                    
                    <Button type="submit">Update Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Track your recent orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i className="fas fa-shopping-bag text-gray-400 text-xl"></i>
                      </div>
                      <h3 className="font-medium text-lg mb-2">No Orders Yet</h3>
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Link href="/menu">
                        <Button>Browse Menu</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                            <div>
                              <span className="font-medium">Order #{order.id}</span>
                              <span className="text-sm text-gray-500 ml-3">
                                {formatDate(order.date)}
                              </span>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs 
                                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                  order.status === 'out_for_delivery' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {order.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex flex-wrap gap-4 mb-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-12 h-12 rounded object-cover mr-3"
                                  />
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {item.quantity} x ₹{item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-500">Total: <span className="font-medium text-black">₹{order.totalAmount}</span></p>
                              </div>
                              <Link href={`/order-tracking/${order.id}`}>
                                <Button variant="outline" size="sm">
                                  <FaTruck className="mr-2" /> Track Order
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center">
                        <Link href="/order-history">
                          <Button variant="outline">View All Orders</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange}>
                    <div className="space-y-4 mb-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                        <Input 
                          id="current-password" 
                          type="password"
                          placeholder="Enter your current password" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                        <Input 
                          id="new-password" 
                          type="password"
                          placeholder="Enter your new password" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          placeholder="Confirm your new password" 
                        />
                      </div>
                    </div>
                    
                    <Button type="submit">Change Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
