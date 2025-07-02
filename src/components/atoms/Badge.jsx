import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  className = '',
  animate = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
    danger: "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  }

  const BadgeContent = (
    <div className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && (
        <ApperIcon name={icon} className="h-3 w-3 mr-1" />
      )}
      {children}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block"
      >
        {BadgeContent}
      </motion.div>
    )
  }

  return BadgeContent
}

export default Badge