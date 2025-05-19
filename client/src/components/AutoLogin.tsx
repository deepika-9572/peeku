import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const AutoLogin = () => {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only auto-login if not already authenticated
    if (!isAuthenticated) {
      // Auto-login with test user
      login({
        id: 1,
        username: "test123",
        isAdmin: false,
        name: "Test User"
      });
    }
  }, [login, isAuthenticated]);

  return null; // This component doesn't render anything
};

export default AutoLogin;
