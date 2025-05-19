import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  username: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.isAdmin);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    // Set user in state
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin);
    
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${userData.name}!`,
      variant: "success"
    });
  };

  const logout = () => {
    // Clear user from state
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    // Remove from localStorage
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "default"
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
