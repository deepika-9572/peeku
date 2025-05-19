import React, { useState } from 'react';
import { ToastContext, ToastState, ToastProps } from '../hooks/use-toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = ({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
    const id = Math.random().toString(36).slice(2);
    
    setToasts((prev) => [
      ...prev,
      {
        id,
        title,
        description,
        variant,
        duration,
        visible: true,
      },
    ]);
    
    if (duration !== Infinity) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
    
    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    
    // Remove toast after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      
      {/* Toast UI could be rendered here */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast ${toast.variant} ${toast.visible ? 'visible' : 'hidden'}`}
          >
            <div className="toast-header">
              <strong>{toast.title}</strong>
              <button onClick={() => dismiss(toast.id)}>×</button>
            </div>
            {toast.description && (
              <div className="toast-body">{toast.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};