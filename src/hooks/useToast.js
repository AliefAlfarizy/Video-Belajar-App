import { useState, useCallback } from 'react';

function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = 'success', title, message, duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

export default useToast;
