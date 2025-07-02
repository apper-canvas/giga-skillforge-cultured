import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  type = 'text',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''
        } ${className}`}
        {...props}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input