import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useToast = () => {
  const [toastId, setToastId] = useState(null);

  const showSuccess = useCallback((message) => {
    const id = toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
    setToastId(id);
    return id;
  }, []);

  const showError = useCallback((message) => {
    const id = toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
    setToastId(id);
    return id;
  }, []);

  const showLoading = useCallback((message = 'Loading...') => {
    const id = toast.loading(message, {
      position: 'top-right',
    });
    setToastId(id);
    return id;
  }, []);

  const dismiss = useCallback((id = null) => {
    if (id) {
      toast.dismiss(id);
    } else if (toastId) {
      toast.dismiss(toastId);
    }
  }, [toastId]);

  const updateToast = useCallback((id, message, type = 'success') => {
    if (type === 'success') {
      toast.success(message, { id });
    } else if (type === 'error') {
      toast.error(message, { id });
    } else {
      toast(message, { id });
    }
  }, []);

  return {
    showSuccess,
    showError,
    showLoading,
    dismiss,
    updateToast,
    toastId,
  };
};