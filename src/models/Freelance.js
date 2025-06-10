const { v4: uuidv4 } = require("uuid")

class Freelance {
  constructor(data) {
    this.id = data.id || uuidv4()
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.phone = data.phone || null
    this.title = data.title
    this.description = data.description || null
    this.location = data.location || null
    this.hourlyRate = data.hourlyRate || null
    this.availability = data.availability || "disponible"
    this.skills = data.skills || []
    this.professionalLinks = data.professionalLinks || []
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  // Méthode pour mettre à jour le freelance
  update(data) {
    Object.keys(data).forEach((key) => {
      if (key !== "id" && key !== "createdAt" && data[key] !== undefined) {
        this[key] = data[key]
      }
    })
    this.updatedAt = new Date().toISOString()
    return this
  }

  // Méthode pour obtenir un résumé du profil
  getSummary() {
    return {
      id: this.id,
      name: `${this.firstName} ${this.lastName}`,
      title: this.title,
      location: this.location,
      availability: this.availability,
      skillsCount: this.skills.length,
      hourlyRate: this.hourlyRate,
    }
  }

  // Validation des données
  static validate(data) {
    const errors = []

    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.push("Le prénom doit contenir au moins 2 caractères")
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      errors.push("Le nom doit contenir au moins 2 caractères")
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push("L'email doit être valide")
    }

    if (!data.title || data.title.trim().length < 3) {
      errors.push("Le titre professionnel doit contenir au moins 3 caractères")
    }

    if (data.hourlyRate && (data.hourlyRate < 0 || data.hourlyRate > 1000)) {
      errors.push("Le tarif horaire doit être entre 0 et 1000 euros")
    }

    return errors
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

module.exports = Freelance
