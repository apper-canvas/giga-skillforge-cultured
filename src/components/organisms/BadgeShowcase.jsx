import { motion } from 'framer-motion'
import BadgeCard from '@/components/molecules/BadgeCard'

const BadgeShowcase = ({ 
  badges = [], 
  subjects = [],
  className = '' 
}) => {
  const getBadgeProgress = (badge) => {
    const subject = subjects.find(s => s.Id === badge.requirement.subjectId)
    if (!subject) return 0
    return Math.min((subject.currentLevel / badge.requirement.level) * 100, 100)
  }

  const isUnlocked = (badge) => {
    const subject = subjects.find(s => s.Id === badge.requirement.subjectId)
    return subject && subject.currentLevel >= badge.requirement.level && badge.unlockedAt
  }

  const sortedBadges = [...badges].sort((a, b) => {
    const aUnlocked = isUnlocked(a)
    const bUnlocked = isUnlocked(b)
    
    if (aUnlocked && !bUnlocked) return -1
    if (!aUnlocked && bUnlocked) return 1
    
    if (!aUnlocked && !bUnlocked) {
      const aProgress = getBadgeProgress(a)
      const bProgress = getBadgeProgress(b)
      return bProgress - aProgress
    }
    
    return new Date(b.unlockedAt) - new Date(a.unlockedAt)
  })

  return (
    <div className={`bg-white rounded-xl p-6 shadow-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Achievement Gallery
        </h2>
        <div className="text-sm text-gray-500">
          {badges.filter(badge => isUnlocked(badge)).length} of {badges.length} unlocked
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {sortedBadges.map((badge, index) => (
          <motion.div
            key={badge.Id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <BadgeCard
              badge={badge}
              isUnlocked={isUnlocked(badge)}
              progress={getBadgeProgress(badge)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default BadgeShowcase