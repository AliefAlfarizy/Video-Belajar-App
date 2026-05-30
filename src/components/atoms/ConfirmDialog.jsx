import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ConfirmDialog({ isOpen, title, message, confirmLabel = 'Ya, Hapus', cancelLabel = 'Batal', variant = 'danger', onConfirm, onCancel }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmStyles = {
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 text-white',
    primary: 'bg-green-500 hover:bg-green-600 focus:ring-green-300 text-white',
  };

  const iconBg = {
    danger: 'bg-red-100',
    warning: 'bg-amber-100',
    primary: 'bg-green-100',
  };

  const iconColor = {
    danger: 'text-red-600',
    warning: 'text-amber-600',
    primary: 'text-green-600',
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center px-4 transition-all duration-200
        ${visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}`}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transition-all duration-300
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl ${iconBg[variant]} flex items-center justify-center mx-auto mb-4`}>
          {variant === 'danger' ? (
            <svg className={`w-6 h-6 ${iconColor[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : variant === 'warning' ? (
            <svg className={`w-6 h-6 ${iconColor[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          ) : (
            <svg className={`w-6 h-6 ${iconColor[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="text-center mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
          {message && <p className="text-sm text-gray-500 leading-relaxed">{message}</p>}
        </div>


        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${confirmStyles[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmDialog;
