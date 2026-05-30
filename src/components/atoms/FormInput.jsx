function FormInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder = '',
  required = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      

      <div className={`relative flex rounded-lg border ${
        error ? 'border-red-400' : 'border-gray-300'
      } focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all`}>
        <input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-white rounded-lg"
        />
        

        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}



export default FormInput;
