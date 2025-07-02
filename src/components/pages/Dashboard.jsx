import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import DashboardHeader from '@/components/organisms/DashboardHeader'
import SubjectsGrid from '@/components/organisms/SubjectsGrid'
import BadgeShowcase from '@/components/organisms/BadgeShowcase'
import SubjectModal from '@/components/organisms/SubjectModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import subjectService from '@/services/api/subjectService'
import badgeService from '@/services/api/badgeService'

const Dashboard = () => {
const [subjects, setSubjects] = useState([])
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add', // 'add', 'edit', 'update'
    subject: null
  })

  const loadData = async () => {
    setLoading(true)
    setError('')
    
    try {
      const [subjectsData, badgesData] = await Promise.all([
        subjectService.getAll(),
        badgeService.getAll()
      ])
      
      setSubjects(subjectsData)
      setBadges(badgesData)
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddSubject = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      subject: null
    })
  }

  const handleEditSubject = (subject) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      subject
    })
  }

  const handleUpdateProgress = (subject) => {
    setModalState({
      isOpen: true,
      mode: 'update',
      subject
    })
  }

  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm('Are you sure you want to delete this subject? This action cannot be undone.')) {
      return
    }

    try {
      await subjectService.delete(subjectId)
      setSubjects(prev => prev.filter(s => s.Id !== subjectId))
      toast.success('Subject deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete subject')
      console.error('Error deleting subject:', error)
    }
  }

  const handleSaveSubject = async (formData) => {
    try {
      let savedSubject

      if (modalState.mode === 'add') {
        savedSubject = await subjectService.create({
          ...formData,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        })
        setSubjects(prev => [...prev, savedSubject])
        toast.success('Subject added successfully!')
      } else if (modalState.mode === 'edit') {
        savedSubject = await subjectService.update(modalState.subject.Id, {
          ...formData,
          lastUpdated: new Date().toISOString()
        })
        setSubjects(prev => prev.map(s => s.Id === modalState.subject.Id ? savedSubject : s))
        toast.success('Subject updated successfully!')
      } else if (modalState.mode === 'update') {
        const previousLevel = modalState.subject.currentLevel
        savedSubject = await subjectService.update(modalState.subject.Id, {
          currentLevel: formData.currentLevel,
          lastUpdated: new Date().toISOString()
        })
        setSubjects(prev => prev.map(s => s.Id === modalState.subject.Id ? savedSubject : s))
        
        // Check for badge unlocks
        const newlyUnlockedBadges = badges.filter(badge => 
          badge.requirement.subjectId === modalState.subject.Id &&
          previousLevel < badge.requirement.level &&
          formData.currentLevel >= badge.requirement.level &&
          !badge.unlockedAt
        )

        if (newlyUnlockedBadges.length > 0) {
          // Update badges with unlock timestamps
          const updatedBadges = await Promise.all(
            newlyUnlockedBadges.map(badge =>
              badgeService.update(badge.Id, {
                unlockedAt: new Date().toISOString()
              })
            )
          )
          
          setBadges(prev => prev.map(badge => {
            const updated = updatedBadges.find(ub => ub.Id === badge.Id)
            return updated || badge
          }))

          // Show celebration
          newlyUnlockedBadges.forEach(badge => {
            toast.success(`🎉 Badge unlocked: ${badge.name}!`, {
              autoClose: 5000
            })
          })
        }

        toast.success('Progress updated successfully!')
      }

      setModalState({ isOpen: false, mode: 'add', subject: null })
    } catch (error) {
      toast.error('Failed to save subject')
      console.error('Error saving subject:', error)
      throw error
    }
  }

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add', subject: null })
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <DashboardHeader subjects={subjects} badges={badges} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                My Subjects
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search subjects..."
                  className="sm:w-64"
                />
                <Button 
                  icon="Plus" 
                  onClick={handleAddSubject}
                  className="whitespace-nowrap"
                >
                  Add Subject
                </Button>
              </div>
            </div>

            <SubjectsGrid
              subjects={subjects}
              badges={badges}
              searchQuery={searchQuery}
              onUpdate={handleUpdateProgress}
              onEdit={handleEditSubject}
              onDelete={handleDeleteSubject}
              onAdd={handleAddSubject}
            />
          </div>

          {/* Sidebar */}
          <div>
            <BadgeShowcase 
              badges={badges} 
              subjects={subjects}
            />
          </div>
        </div>

        <SubjectModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          subject={modalState.subject}
          onClose={closeModal}
          onSave={handleSaveSubject}
        />
      </div>
    </div>
  )
}

export default Dashboard