
function Button({ 
  children, 
  type = "button", 
  variant = "primary", 
  onClick, 
  disabled = false, 
  fullWidth = true 
}) {
  const baseStyle = "flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm active:scale-98 select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed",
    brand: "bg-gradient-to-r from-green-500 to-orange-500 text-white hover:from-green-600 hover:to-orange-600 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed",
    orange: "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400 disabled:opacity-50",
    google: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md focus:ring-gray-300 disabled:opacity-50 font-medium"
  };



  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${widthStyle}`}
      onClick={onClick}
      disabled={disabled}
    >


      {variant === 'google' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path d="M21.35,11.1H12v2.7h5.38C16.88,16.03,14.73,17.4,12,17.4c-2.98,0-5.5-2.02-6.4-4.75c-0.23-0.69-0.36-1.42-0.36-2.19c0-0.77,0.13-1.5,0.36-2.19c0.9-2.73,3.42-4.75,6.4-4.75c1.61,0,3.06,0.59,4.2,1.57l2.02-2.02C16.99,1.91,14.65,1.1,12,1.1c-4.49,0-8.28,2.94-9.61,7.01c-0.39,1.2-0.61,2.48-0.61,3.81c0,1.33,0.22,2.61,0.61,3.81c1.33,4.07,5.12,7.01,9.61,7.01c3.15,0,5.79-1.04,7.72-2.83c1.94-1.8,3.12-4.48,3.12-7.82C22.84,12.24,22.28,11.59,21.35,11.1z" fill="#4285F4" />
            <path d="M12,1.1c2.65,0,4.99,0.81,6.22,2.02l2.02-2.02C16.99,1.91,14.65,1.1,12,1.1z" fill="#EA4335" />
            <path d="M2.39,8.11c1.33-4.07,5.12-7.01,9.61-7.01c2.65,0,4.99,0.81,6.22,2.02l2.02-2.02c-1.92-1.78-4.26-2.59-6.91-2.59C7.51-1.5,3.72,1.44,2.39,5.51c-0.39,1.2-0.61,2.48-0.61,3.81c0,0.35,0.02,0.7,0.06,1.05l2.45-1.9C2.31,8.96,2.33,8.53,2.39,8.11z" fill="#FBBC05" />
            <path d="M12,22.9c3.15,0,5.79-1.04,7.72-2.83l-2.47-1.92c-1.12,0.75-2.55,1.2-5.25,1.2c-2.98,0-5.5-2.02-6.4-4.75l-2.45,1.9C4.48,20.6,8.02,22.9,12,22.9z" fill="#34A853" />
          </g>
        </svg>
      )}


      {children}

    </button>
  );
}



export default Button;
