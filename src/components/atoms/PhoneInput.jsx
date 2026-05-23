function PhoneInput({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder = '',
  required = false 
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`flex rounded-lg border overflow-hidden ${
        error ? 'border-red-400' : 'border-gray-300'
      } focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all`}>
        {/* Flag + code */}
        <div className="flex items-center gap-1.5 px-3 bg-white border-r border-gray-300 shrink-0">
          {/* Indonesia flag SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm overflow-hidden shrink-0">
            <rect width="20" height="7" fill="#CE1126"/>
            <rect y="7" width="20" height="7" fill="#FFFFFF"/>
          </svg>
          <span className="text-sm text-gray-700">+62</span>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Phone number input */}
        <input
          type="tel"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-white"
        />
      </div>
      
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default PhoneInput;
