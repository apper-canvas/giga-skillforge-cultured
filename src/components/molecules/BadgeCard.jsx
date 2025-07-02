import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const BadgeCard = ({ 
  badge, 
  isUnlocked = false, 
  progress = 0,
  className = '' 
}) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, rotateY: 5 } : { scale: 1.02 }}
      className={`text-center ${className}`}
    >
      <div className={`relative h-16 w-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
        isUnlocked 
          ? 'bg-gradient-to-br from-secondary-400 to-secondary-500 shadow-badge badge-glow' 
          : 'bg-gray-200'
      }`}>
        <ApperIcon 
          name={badge.icon} 
          className={`h-8 w-8 ${isUnlocked ? 'text-white' : 'text-gray-400'}`} 
        />
        
        {isUnlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Check" className="h-3 w-3 text-white" />
          </motion.div>
        )}
        
        {!isUnlocked && progress > 0 && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-200"
                strokeDasharray={`${progress * 2.83} 283`}
              />
            </svg>
          </div>
        )}
      </div>
      
      <h4 className={`text-sm font-medium mb-1 ${
        isUnlocked ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {badge.name}
      </h4>
      
      <p className={`text-xs ${
        isUnlocked ? 'text-gray-600' : 'text-gray-400'
      }`}>
        {badge.description}
      </p>
      
      {!isUnlocked && progress > 0 && (
        <div className="mt-2">
          <div className="text-xs text-primary-600 font-medium">
            {Math.round(progress)}% complete
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default BadgeCard