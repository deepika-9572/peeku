import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProducts, getAllOrders, ProductType, OrderType } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      setLocation("/");
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // Load data
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      const allProducts = getAllProducts();
      const allOrders = getAllOrders();
      
      setProducts(allProducts);
      setOrders(allOrders);
      
      // Calculate stats
      const pendingOrders = allOrders.filter(
        order => order.status === "pending" || order.status === "processing"
      ).length;
      
      const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      setStats({
        totalOrders: allOrders.length,
        pendingOrders,
        totalRevenue,
        totalProducts: allProducts.length
      });
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full loader mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="font-heading text-3xl mb-2 sm:mb-0">Admin Dashboard</h1>
        <Link href="/admin/orders">
          <Button>
            <i className="fas fa-clipboard-list mr-2"></i> Manage Orders
          </Button>
        </Link>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
              </div>
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <i className="fas fa-shopping-cart text-primary"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingOrders}</h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-yellow-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalRevenue)}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-rupee-sign text-green-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalProducts}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-birthday-cake text-blue-600"></i>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No orders found</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium text-primary">#{order.id}</span>
                        <span className="text-sm text-gray-500 ml-2">{new Date(order.date).toLocaleDateString()}</span>
                      </div>
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
                    <p className="text-sm mb-1">
                      <span className="text-gray-500">Customer:</span> {order.userId === 1 ? "Test User" : "Unknown"}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Items:</span> {order.items.length} | 
                      <span className="text-gray-500 ml-2">Total:</span> {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                ))}
                
                <div className="pt-2 text-center">
                  <Link href="/admin/orders">
                    <Button variant="outline" size="sm">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Popular Products */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Most frequently ordered items</CardDescription>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No products found</p>
            ) : (
              <div className="space-y-4">
                {products.filter(product => product.featured).slice(0, 5).map((product) => (
                  <div key={product.id} className="flex border-b pb-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{product.name}</h4>
                        <span className="text-sm font-medium">{formatCurrency(product.price)}</span>
                      </div>
                      <p className="text-sm text-gray-500">{product.shortDescription}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-accent text-xs">
                          {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                          {product.rating % 1 > 0 && <i className="fas fa-star-half-alt"></i>}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 text-center">
                  <Button variant="outline" size="sm">
                    Manage Products
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-heading text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-plus text-primary"></i>
              </div>
              <h3 className="font-medium mb-1">Add New Product</h3>
              <p className="text-sm text-gray-500 mb-3">Create a new bakery product</p>
              <Button variant="outline" size="sm" className="mt-auto">Add Product</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-tag text-blue-600"></i>
              </div>
              <h3 className="font-medium mb-1">Manage Categories</h3>
              <p className="text-sm text-gray-500 mb-3">Edit product categories</p>
              <Button variant="outline" size="sm" className="mt-auto">Categories</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-percent text-purple-600"></i>
              </div>
              <h3 className="font-medium mb-1">Create Promotion</h3>
              <p className="text-sm text-gray-500 mb-3">Set up special offers</p>
              <Button variant="outline" size="sm" className="mt-auto">Promotions</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-chart-bar text-green-600"></i>
              </div>
              <h3 className="font-medium mb-1">Sales Reports</h3>
              <p className="text-sm text-gray-500 mb-3">View detailed analytics</p>
              <Button variant="outline" size="sm" className="mt-auto">Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
