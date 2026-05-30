function FormSelect({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Pilih opsi',
  required = false 
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white outline-none appearance-none focus:ring-2 focus:ring-offset-0 focus:border-green-500 focus:ring-green-200 cursor-pointer"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}



export default FormSelect;
