import { createPortal } from 'react-dom';
import Toast from './Toast';

function ToastContainer({ toasts, onClose }) {
  return createPortal(
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;
