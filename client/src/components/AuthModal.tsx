import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthModal = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const closeModal = () => {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.add("hidden");
    // Reset form state
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setConfirmPassword("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "test123" && password === "test123") {
      login({
        id: 1,
        username: "test123",
        isAdmin: false,
        name: "Test User"
      });
      closeModal();
      toast({
        title: "Success!",
        description: "You are now logged in.",
      });
    } else if (username === "admin" && password === "admin123") {
      login({
        id: 2,
        username: "admin",
        isAdmin: true,
        name: "Admin User"
      });
      closeModal();
      toast({
        title: "Admin Access",
        description: "You are now logged in as admin.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !username || !password || !confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    login({
      id: 3,
      username,
      isAdmin: false,
      name
    });
    closeModal();
    toast({
      title: "Account Created!",
      description: "You are now logged in.",
    });
  };

  return (
    <div id="auth-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-2xl" id="auth-modal-title">
            {isLoginView ? "Log In" : "Sign Up"}
          </h3>
          <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-800">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {isLoginView ? (
          <div id="login-form">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email or Username
                </label>
                <input 
                  type="text" 
                  id="login-email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  id="login-password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:text-primaryDark">
                  Forgot password?
                </a>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Log In
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-neutral-600">
                Don't have an account? 
                <button 
                  onClick={() => setIsLoginView(false)} 
                  className="text-primary hover:text-primaryDark ml-1"
                >
                  Sign up
                </button>
              </p>
              <div className="mt-4 text-xs bg-gray-100 p-2 rounded">
                <p className="font-medium">Demo Credentials:</p>
                <p>User: test123 / test123</p>
                <p>Admin: admin / admin123</p>
              </div>
            </div>
          </div>
        ) : (
          <div id="signup-form">
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="signup-name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="signup-email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-neutral-700 mb-1">
                  Username
                </label>
                <input 
                  type="text" 
                  id="signup-username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  id="signup-password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Confirm Password
                </label>
                <input 
                  type="password" 
                  id="signup-confirm-password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-neutral-600">
                Already have an account? 
                <button 
                  onClick={() => setIsLoginView(true)} 
                  className="text-primary hover:text-primaryDark ml-1"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
