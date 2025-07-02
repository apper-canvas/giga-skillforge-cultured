import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  color = 'primary',
  className = '',
  ...props 
}) => {
  const colors = {
    primary: {
      bg: 'from-primary-50 to-primary-100',
      icon: 'text-primary-500',
      value: 'text-primary-600'
    },
    secondary: {
      bg: 'from-secondary-50 to-secondary-100',
      icon: 'text-secondary-500',
      value: 'text-secondary-600'
    },
    accent: {
      bg: 'from-accent-50 to-accent-100',
      icon: 'text-accent-500',
      value: 'text-accent-600'
    },
    success: {
      bg: 'from-green-50 to-green-100',
      icon: 'text-green-500',
      value: 'text-green-600'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-all duration-200 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`h-12 w-12 bg-gradient-to-br ${colors[color].bg} rounded-xl flex items-center justify-center`}>
          <ApperIcon name={icon} className={`h-6 w-6 ${colors[color].icon}`} />
        </div>
        
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <ApperIcon 
              name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
              className="h-4 w-4 mr-1" 
            />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-display font-bold ${colors[color].value} mb-1`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </motion.div>
  )
}

export default StatCard