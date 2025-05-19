import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import OrderTracking from "@/pages/OrderTracking";
import OrderHistory from "@/pages/OrderHistory";
import Checkout from "@/pages/Checkout";
import Admin from "@/pages/Admin";
import AdminOrders from "@/pages/AdminOrders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileSidebar from "@/components/MobileSidebar";
import CartSidebar from "@/components/CartSidebar";
import { useEffect } from "react";
import { useCart } from "./context/CartContext";
import ProductModal from "./components/ProductModal";
import OrderProcessingModal from "./components/OrderProcessingModal";

function Router() {
  return (
    <Switch>
      <Route path="/order-tracking/:id">
        {params => <OrderTracking key={params.id} />}
      </Route>
      <Route path="/menu" component={Menu} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={Profile} />
      <Route path="/order-history" component={OrderHistory} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { resetCart } = useCart();

  useEffect(() => {
    // Initialize cart on app load
    resetCart();
  }, [resetCart]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-200">
          <Navbar />
          <MobileSidebar />
          <CartSidebar />
          <ProductModal />
          <OrderProcessingModal />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
