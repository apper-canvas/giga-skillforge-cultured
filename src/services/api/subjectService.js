import mockSubjects from '@/services/mockData/subjects.json'

class SubjectService {
  constructor() {
    this.subjects = [...mockSubjects]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.subjects]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const subject = this.subjects.find(s => s.Id === id)
    if (!subject) {
      throw new Error('Subject not found')
    }
    return { ...subject }
  }

  async create(subjectData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newSubject = {
      Id: Math.max(...this.subjects.map(s => s.Id), 0) + 1,
      ...subjectData
    }
    
    this.subjects.push(newSubject)
    return { ...newSubject }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.subjects.findIndex(s => s.Id === id)
    if (index === -1) {
      throw new Error('Subject not found')
    }
    
    this.subjects[index] = { ...this.subjects[index], ...updateData }
    return { ...this.subjects[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.subjects.findIndex(s => s.Id === id)
    if (index === -1) {
      throw new Error('Subject not found')
    }
    
    this.subjects.splice(index, 1)
    return true
  }
}

export default new SubjectService()