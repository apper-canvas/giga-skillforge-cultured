import mockBadges from '@/services/mockData/badges.json'

class BadgeService {
  constructor() {
    this.badges = [...mockBadges]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.badges]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const badge = this.badges.find(b => b.Id === id)
    if (!badge) {
      throw new Error('Badge not found')
    }
    return { ...badge }
  }

  async create(badgeData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newBadge = {
      Id: Math.max(...this.badges.map(b => b.Id), 0) + 1,
      ...badgeData
    }
    
    this.badges.push(newBadge)
    return { ...newBadge }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.badges.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error('Badge not found')
    }
    
    this.badges[index] = { ...this.badges[index], ...updateData }
    return { ...this.badges[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.badges.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error('Badge not found')
    }
    
    this.badges.splice(index, 1)
    return true
  }
}

export default new BadgeService()