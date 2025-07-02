import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ProgressBar from '@/components/atoms/ProgressBar'
import Badge from '@/components/atoms/Badge'

const SubjectCard = ({ 
  subject, 
  badges = [], 
  onUpdate, 
  onEdit, 
  onDelete,
  className = '' 
}) => {
  const getProgressColor = (level) => {
    if (level >= 75) return 'success'
    if (level >= 50) return 'primary'
    if (level >= 25) return 'warning'
    return 'danger'
  }

  const earnedBadges = badges.filter(badge => 
    badge.requirement.subjectId === subject.Id && 
    subject.currentLevel >= badge.requirement.level &&
    badge.unlockedAt
  )

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-all duration-200 border-t-4 ${className}`}
      style={{ borderTopColor: subject.color }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
            {subject.name}
          </h3>
          <Badge variant="default" size="sm">
            {subject.category}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdate(subject)}
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
          >
            <ApperIcon name="TrendingUp" className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(subject)}
            className="p-2 text-gray-400 hover:text-secondary-500 transition-colors"
          >
            <ApperIcon name="Edit" className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(subject.Id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <ApperIcon name="Trash2" className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="mb-4">
        <ProgressBar 
          value={subject.currentLevel} 
          max={subject.targetLevel}
          color={getProgressColor(subject.currentLevel)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{subject.currentLevel}%</span> of {subject.targetLevel}% goal
        </div>
        
        <div className="flex items-center space-x-1">
          {earnedBadges.slice(0, 3).map((badge, index) => (
            <motion.div
              key={badge.Id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="h-6 w-6 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              title={badge.name}
            >
              <ApperIcon name={badge.icon} className="h-3 w-3" />
            </motion.div>
          ))}
          
          {earnedBadges.length > 3 && (
            <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
              +{earnedBadges.length - 3}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SubjectCard