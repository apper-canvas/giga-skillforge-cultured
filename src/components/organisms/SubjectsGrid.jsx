import { motion } from 'framer-motion'
import SubjectCard from '@/components/molecules/SubjectCard'
import Empty from '@/components/ui/Empty'

const SubjectsGrid = ({ 
  subjects = [], 
  badges = [], 
  onUpdate, 
  onEdit, 
  onDelete,
  onAdd,
  searchQuery = '',
  className = '' 
}) => {
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (subjects.length === 0) {
    return (
      <Empty
        title="Start Your Learning Journey"
        description="Add your first subject to begin tracking your progress and earning badges!"
        actionLabel="Add Subject"
        onAction={onAdd}
        icon="BookOpen"
      />
    )
  }

  if (filteredSubjects.length === 0) {
    return (
      <Empty
        title="No subjects found"
        description={`No subjects match "${searchQuery}". Try adjusting your search.`}
        icon="Search"
      />
    )
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredSubjects.map((subject, index) => (
          <motion.div
            key={subject.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SubjectCard
              subject={subject}
              badges={badges}
              onUpdate={onUpdate}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default SubjectsGrid