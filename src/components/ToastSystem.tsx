import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  X,
  Bell,
  BellOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);

    // Show browser notification if enabled
    if (notificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(toast.title, {
          body: toast.message,
          icon: '/favicon.ico',
          tag: id
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(toast.title, {
              body: toast.message,
              icon: '/favicon.ico',
              tag: id
            });
          }
        });
      }
    }

    // Auto-remove toast after duration
    if (!toast.persistent && newToast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onRemove={removeToast}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
      />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

function ToastContainer({ 
  toasts, 
  onRemove, 
  notificationsEnabled, 
  onToggleNotifications 
}: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {/* Notification Toggle */}
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleNotifications}
          className="h-8 w-8 p-0"
        >
          {notificationsEnabled ? (
            <Bell className="h-4 w-4 text-blue-600" />
          ) : (
            <BellOff className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      </div>

      {/* Toast List */}
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  index: number;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, index, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-amber-200 bg-amber-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <Card
      className={cn(
        "toast transform transition-all duration-300 ease-in-out",
        getToastStyles(toast.type),
        isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        isLeaving && "translate-x-full opacity-0 scale-95"
      )}
      style={{
        transform: `translateY(${index * 4}px)`,
        zIndex: 1000 - index
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getToastIcon(toast.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900 mb-1">
              {toast.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {toast.message}
            </p>
            
            {toast.action && (
              <Button
                variant="outline"
                size="sm"
                onClick={toast.action.onClick}
                className="text-xs h-6 px-2"
              >
                {toast.action.label}
              </Button>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="flex-shrink-0 h-6 w-6 p-0 hover:bg-gray-200"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Predefined toast functions for common use cases
export const toast = {
  success: (title: string, message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast();
    addToast({ type: 'success', title, message, ...options });
  },
  
  error: (title: string, message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast();
    addToast({ type: 'error', title, message, ...options });
  },
  
  warning: (title: string, message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast();
    addToast({ type: 'warning', title, message, ...options });
  },
  
  info: (title: string, message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast();
    addToast({ type: 'info', title, message, ...options });
  }
};

// Specific toast functions for 311 portal
export const civicToasts = {
  requestSubmitted: (trackingNumber: string) => {
    const { addToast } = useToast();
    addToast({
      type: 'success',
      title: 'Request Submitted Successfully!',
      message: `Your request has been submitted with tracking number ${trackingNumber}. You'll receive updates via email.`,
      action: {
        label: 'Track Request',
        onClick: () => {
          // Navigate to tracking page
          console.log('Navigate to tracking page');
        }
      }
    });
  },
  
  requestUpdated: (trackingNumber: string, status: string) => {
    const { addToast } = useToast();
    addToast({
      type: 'info',
      title: 'Request Status Updated',
      message: `Request ${trackingNumber} status has been updated to: ${status}`,
      action: {
        label: 'View Details',
        onClick: () => {
          // Navigate to request details
          console.log('Navigate to request details');
        }
      }
    });
  },
  
  requestResolved: (trackingNumber: string) => {
    const { addToast } = useToast();
    addToast({
      type: 'success',
      title: 'Request Resolved!',
      message: `Your request ${trackingNumber} has been successfully resolved. Thank you for helping keep Fort Wayne clean and safe!`,
      action: {
        label: 'Rate Service',
        onClick: () => {
          // Open rating modal
          console.log('Open rating modal');
        }
      }
    });
  },
  
  locationDetected: (address: string) => {
    const { addToast } = useToast();
    addToast({
      type: 'info',
      title: 'Location Detected',
      message: `We found you at ${address}. Is this correct?`,
      duration: 3000
    });
  },
  
  photoUploaded: (count: number) => {
    const { addToast } = useToast();
    addToast({
      type: 'success',
      title: 'Photos Uploaded',
      message: `${count} photo${count > 1 ? 's' : ''} uploaded successfully.`,
      duration: 2000
    });
  },
  
  networkError: () => {
    const { addToast } = useToast();
    addToast({
      type: 'error',
      title: 'Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      persistent: true,
      action: {
        label: 'Retry',
        onClick: () => {
          // Retry the failed action
          window.location.reload();
        }
      }
    });
  },
  
  maintenanceMode: () => {
    const { addToast } = useToast();
    addToast({
      type: 'warning',
      title: 'Scheduled Maintenance',
      message: 'The system will be under maintenance from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.',
      persistent: true
    });
  }
};
