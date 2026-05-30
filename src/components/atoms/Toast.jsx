import { useEffect, useState } from 'react';

const icons = {
  success: (
    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ),
  error: (
    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  ),
  info: (
    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  warning: (
    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </div>
  ),
};

const progressColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
};

function Toast({ id, type = 'success', title, message, duration = 3500, onClose }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const mountTimer = setTimeout(() => setVisible(true), 10);
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev - (100 / (duration / 50));
        return next <= 0 ? 0 : next;
      });
    }, 50);

    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(closeTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      className={`relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
    >
      {/* Content */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        {icons[type]}
        <div className="flex-1 min-w-0 pt-0.5">
          {title && <p className="text-sm font-bold text-gray-900 leading-snug">{title}</p>}
          {message && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{message}</p>}
        </div>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-1 bg-gray-100">
        <div
          className={`h-full ${progressColors[type]} transition-all duration-50 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Toast;
