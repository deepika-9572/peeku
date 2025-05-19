import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/components/ui/theme-provider";
import { useState } from "react";
import { FaBars, FaSearch, FaMoon, FaSun, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [location] = useLocation();
  const { cart, showCart } = useCart();
  const { theme, setTheme } = useTheme();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileSidebar = () => {
    const sidebar = document.getElementById("mobile-sidebar");
    if (sidebar) sidebar.classList.remove("hidden");
  };

  // No auth modal needed anymore

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-3 px-4 sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden text-neutral-800 dark:text-white"
        >
          <FaBars className="text-xl" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-script text-2xl text-primary dark:text-primary">Peeku's</span>
          <span className="font-heading ml-1 text-xl font-bold dark:text-white">Bakery</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 text-neutral-700 dark:text-gray-200">
          <Link
            href="/"
            className={`hover:text-primary transition-colors font-medium ${
              location === "/" ? "text-primary" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`hover:text-primary transition-colors font-medium ${
              location === "/menu" ? "text-primary" : ""
            }`}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className={`hover:text-primary transition-colors font-medium ${
              location === "/about" ? "text-primary" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`hover:text-primary transition-colors font-medium ${
              location === "/contact" ? "text-primary" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className={`hover:text-primary transition-colors font-medium ${
              location.startsWith("/admin") ? "text-primary" : ""
            }`}
          >
            Admin
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <div className={`relative ${showSearchInput ? "block" : "hidden"} sm:hidden`}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-1 px-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="hover:text-primary transition-colors text-black dark:text-white"
          >
            <FaSearch size={18} />
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:text-primary transition-colors text-black dark:text-white"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <Link href="/profile">
            <button className="hover:text-primary transition-colors text-black dark:text-white">
              <FaUser size={18} />
            </button>
          </Link>
          <button
            onClick={showCart}
            className="relative hover:text-primary transition-colors text-black dark:text-white"
          >
            <FaShoppingCart size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
