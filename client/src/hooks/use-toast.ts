import { createContext, useContext } from "react";

export type ToastVariant = "default" | "destructive" | "success";

export type ToastProps = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

export type ToastState = ToastProps & {
  id: string;
  visible: boolean;
};

export type ToastContextType = {
  toasts: ToastState[];
  toast: (props: ToastProps) => void;
  dismiss: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
});

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
};
