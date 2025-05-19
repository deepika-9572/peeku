import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/ui/theme-provider";
import { FaTimes, FaSun, FaMoon, FaUserCircle, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const MobileSidebar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const closeSidebar = () => {
    const sidebar = document.getElementById("mobile-sidebar");
    if (sidebar) sidebar.classList.add("hidden");
  };

  const showAuthModal = () => {
    closeSidebar();
    const authModal = document.getElementById("auth-modal");
    if (authModal) authModal.classList.remove("hidden");
  };

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  return (
    <div id="mobile-sidebar" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
      <div className="bg-white dark:bg-gray-800 h-full w-4/5 max-w-xs p-5 transform transition-transform transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          <span className="font-script text-2xl text-primary dark:text-primary">Peeku's</span>
          <button onClick={closeSidebar} className="text-neutral-800 dark:text-white">
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-4 mb-8">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center py-2 hover:text-primary transition-colors dark:text-white">
            {theme === 'dark' ? <FaSun className="mr-3" size={18} /> : <FaMoon className="mr-3" size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <Link href="/" onClick={closeSidebar} className="py-2 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link href="/menu" onClick={closeSidebar} className="py-2 hover:text-primary transition-colors font-medium">
            Menu
          </Link>
          <Link href="/about" onClick={closeSidebar} className="py-2 hover:text-primary transition-colors font-medium">
            About Us
          </Link>
          <Link href="/contact" onClick={closeSidebar} className="py-2 hover:text-primary transition-colors font-medium">
            Contact
          </Link>
          {isAdmin && (
            <Link href="/admin" onClick={closeSidebar} className="py-2 hover:text-primary transition-colors font-medium">
              Admin
            </Link>
          )}
        </div>
        
        {!isAuthenticated ? (
          <div className="border-t border-neutral-200 pt-6 space-y-4" id="sidebar-auth-section">
            <button onClick={showAuthModal} className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primaryDark transition-colors">
              Log In
            </button>
            <button onClick={showAuthModal} className="w-full py-2 px-4 border border-primary text-primary rounded hover:bg-secondary transition-colors">
              Sign Up
            </button>
          </div>
        ) : (
          <div className="border-t border-neutral-200 pt-6 space-y-4" id="sidebar-user-section">
            <Link href="/profile" onClick={closeSidebar} className="flex items-center py-2 hover:text-primary transition-colors">
              <FaUserCircle className="mr-3" size={18} />
              <span>My Profile</span>
            </Link>
            <Link href="/order-history" onClick={closeSidebar} className="flex items-center py-2 hover:text-primary transition-colors">
              <FaClipboardList className="mr-3" size={18} />
              <span>My Orders</span>
            </Link>
            <button onClick={handleLogout} className="flex items-center py-2 text-error hover:opacity-80 transition-colors w-full text-left">
              <FaSignOutAlt className="mr-3" size={18} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;
