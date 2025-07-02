import { motion } from 'framer-motion'

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className = '',
  showLabel = true,
  size = 'md',
  color = 'primary'
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const colors = {
    primary: 'from-primary-500 to-accent-500',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-orange-500',
    danger: 'from-red-500 to-red-600'
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`h-full bg-gradient-to-r ${colors[color]} progress-bar-fill`}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-600">{Math.round(percentage)}% Complete</span>
          <span className="text-gray-500">{value}/{max}</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar