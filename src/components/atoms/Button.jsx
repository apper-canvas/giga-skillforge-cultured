import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl focus:ring-primary-500 disabled:from-gray-300 disabled:to-gray-400",
    secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:shadow-xl focus:ring-accent-500 disabled:from-gray-300 disabled:to-gray-400",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl focus:ring-green-500 disabled:from-gray-300 disabled:to-gray-400",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500 disabled:from-gray-300 disabled:to-gray-400"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="h-4 w-4 mr-2" />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="h-4 w-4 ml-2" />
      )}
    </motion.button>
  )
}

export default Button