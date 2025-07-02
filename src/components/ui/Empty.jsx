import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No data found",
  description = "Get started by adding your first item",
  actionLabel = "Add Item",
  onAction,
  icon = "BookOpen"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-6"
    >
      <div className="max-w-md mx-auto">
        <div className="h-24 w-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="h-12 w-12 text-primary-500" />
        </div>
        
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAction}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="Plus" className="h-5 w-5 inline mr-2" />
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty