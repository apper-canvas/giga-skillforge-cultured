import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = '',
  ...props 
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
          {...props}
        />
        
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              onSearch?.('')
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <ApperIcon name="X" className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar