import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

const SubjectModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  subject = null,
  mode = 'add' // 'add', 'edit', 'update'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    currentLevel: 0,
    targetLevel: 100,
    color: '#5B47E0'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'Language Arts', label: 'Language Arts' },
    { value: 'History', label: 'History' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Music', label: 'Music' },
    { value: 'Other', label: 'Other' }
  ]

  const colors = [
    '#5B47E0', '#E91E63', '#F39C12', '#27AE60', 
    '#3498DB', '#9B59B6', '#E74C3C', '#2ECC71',
    '#F1C40F', '#E67E22', '#1ABC9C', '#34495E'
  ]

useEffect(() => {
    // Only initialize form data when modal is actually opening
    if (!isOpen) return
    
    // Add small delay to ensure modal state is stable
    const timeoutId = setTimeout(() => {
      if (subject && mode !== 'add') {
        setFormData({
          name: subject.name || '',
          category: subject.category || '',
          currentLevel: subject.currentLevel || 0,
          targetLevel: subject.targetLevel || 100,
          color: subject.color || '#5B47E0'
        })
      } else if (mode === 'add') {
        setFormData({
          name: '',
          category: '',
          currentLevel: 0,
          targetLevel: 100,
          color: '#5B47E0'
        })
      }
      setErrors({})
    }, 10) // Small delay to prevent race conditions
    
    return () => clearTimeout(timeoutId)
  }, [isOpen, mode, subject?.Id]) // Use subject.Id instead of entire subject object

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (formData.currentLevel < 0 || formData.currentLevel > 100) {
      newErrors.currentLevel = 'Current level must be between 0 and 100'
    }
    
    if (formData.targetLevel < 1 || formData.targetLevel > 100) {
      newErrors.targetLevel = 'Target level must be between 1 and 100'
    }
    
    if (formData.currentLevel > formData.targetLevel) {
      newErrors.currentLevel = 'Current level cannot exceed target level'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
try {
      await onSave(formData)
      // Don't call onClose here - let parent component handle modal state
    } catch (error) {
      console.error('Error saving subject:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getTitle = () => {
    switch (mode) {
      case 'edit': return 'Edit Subject'
      case 'update': return 'Update Progress'
      default: return 'Add New Subject'
    }
  }

return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={onClose}
            />

<motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-gray-900">
                  {getTitle()}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ApperIcon name="X" className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode !== 'update' && (
                  <>
                    <Input
                      label="Subject Name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                      placeholder="e.g., Advanced Mathematics"
                    />

                    <Select
                      label="Category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      options={categories}
                      error={errors.category}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Subject Color
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => handleChange('color', color)}
                            className={`h-8 w-8 rounded-full border-2 transition-all ${
                              formData.color === color 
                                ? 'border-gray-900 scale-110' 
                                : 'border-gray-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Current Level (%)"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.currentLevel}
                    onChange={(e) => handleChange('currentLevel', parseInt(e.target.value) || 0)}
                    error={errors.currentLevel}
                  />

                  {mode !== 'update' && (
                    <Input
                      label="Target Level (%)"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.targetLevel}
                      onChange={(e) => handleChange('targetLevel', parseInt(e.target.value) || 100)}
                      error={errors.targetLevel}
                    />
                  )}
                </div>

                {mode === 'update' && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: subject?.color }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{subject?.name}</p>
                        <p className="text-sm text-gray-600">{subject?.category}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={loading}
                    className="flex-1"
                  >
                    {mode === 'update' ? 'Update Progress' : mode === 'edit' ? 'Save Changes' : 'Add Subject'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SubjectModal