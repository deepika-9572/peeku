import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import "./styles/theme.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);
