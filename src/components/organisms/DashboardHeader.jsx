import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import StatCard from '@/components/molecules/StatCard'

const DashboardHeader = ({ 
  subjects = [], 
  badges = [],
  className = '' 
}) => {
  const totalSubjects = subjects.length
  const averageProgress = subjects.length > 0 
    ? Math.round(subjects.reduce((sum, subject) => sum + subject.currentLevel, 0) / subjects.length)
    : 0
  const totalBadges = badges.filter(badge => badge.unlockedAt).length
  const completedSubjects = subjects.filter(subject => subject.currentLevel >= subject.targetLevel).length

  const getMotivationalMessage = () => {
    if (averageProgress >= 80) return "Outstanding progress! You're crushing your goals! 🌟"
    if (averageProgress >= 60) return "Great job! Keep up the excellent work! 🚀"
    if (averageProgress >= 40) return "You're making solid progress! Stay focused! 💪"
    if (averageProgress >= 20) return "Good start! Every step counts towards mastery! 📈"
    return "Welcome to SkillForge! Start your learning journey today! ✨"
  }

  return (
    <div className={`mb-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            SkillForge
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          {getMotivationalMessage()}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Subjects"
          value={totalSubjects}
          subtitle={`${completedSubjects} completed`}
          icon="BookOpen"
          color="primary"
        />
        
        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          subtitle="Across all subjects"
          icon="TrendingUp"
          color="success"
          trend={averageProgress > 50 ? 15 : -5}
        />
        
        <StatCard
          title="Badges Earned"
          value={totalBadges}
          subtitle={`${badges.length - totalBadges} remaining`}
          icon="Award"
          color="secondary"
        />
        
        <StatCard
          title="Learning Streak"
          value="7 days"
          subtitle="Keep it up!"
          icon="Calendar"
          color="accent"
          trend={12}
        />
      </div>
    </div>
  )
}

export default DashboardHeader