const Freelance = require("../models/Freelance")
const { v4: uuidv4 } = require("uuid")
const SeedService = require("./seedService")

// Stockage en mémoire (remplacer par une base de données en production)
const freelances = []

// Données de démonstration
const initializeDemoData = () => {
  if (freelances.length === 0) {
    SeedService.initializeDatabase(freelances)
  }
}

class FreelanceService {
  constructor() {
    initializeDemoData()
  }

  // Récupérer tous les freelances
  getAllFreelances(filters = {}) {
    let result = [...freelances]

    // Filtrage par disponibilité
    if (filters.availability) {
      result = result.filter((f) => f.availability === filters.availability)
    }

    // Filtrage par compétence
    if (filters.skill) {
      result = result.filter((f) =>
        f.skills.some((skill) => skill.name.toLowerCase().includes(filters.skill.toLowerCase())),
      )
    }

    // Filtrage par localisation
    if (filters.location) {
      result = result.filter((f) => f.location && f.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    return result
  }

  // Récupérer un freelance par ID
  getFreelanceById(id) {
    return freelances.find((f) => f.id === id)
  }

  // Créer un nouveau freelance
  createFreelance(data) {
    // Validation
    const errors = Freelance.validate(data)
    if (errors.length > 0) {
      throw new Error(`Erreurs de validation: ${errors.join(", ")}`)
    }

    // Vérifier l'unicité de l'email
    const existingFreelance = freelances.find((f) => f.email === data.email)
    if (existingFreelance) {
      throw new Error("Un freelance avec cet email existe déjà")
    }

    // Ajouter des IDs aux compétences et liens
    if (data.skills) {
      data.skills = data.skills.map((skill) => ({
        ...skill,
        id: skill.id || uuidv4(),
      }))
    }

    if (data.professionalLinks) {
      data.professionalLinks = data.professionalLinks.map((link) => ({
        ...link,
        id: link.id || uuidv4(),
      }))
    }

    const freelance = new Freelance(data)
    freelances.push(freelance)
    return freelance
  }

  // Mettre à jour un freelance
  updateFreelance(id, data) {
    const freelance = this.getFreelanceById(id)
    if (!freelance) {
      throw new Error("Freelance non trouvé")
    }

    // Validation des nouvelles données
    const dataToValidate = { ...freelance, ...data }
    const errors = Freelance.validate(dataToValidate)
    if (errors.length > 0) {
      throw new Error(`Erreurs de validation: ${errors.join(", ")}`)
    }

    // Vérifier l'unicité de l'email si modifié
    if (data.email && data.email !== freelance.email) {
      const existingFreelance = freelances.find((f) => f.email === data.email && f.id !== id)
      if (existingFreelance) {
        throw new Error("Un freelance avec cet email existe déjà")
      }
    }

    // Ajouter des IDs aux nouvelles compétences et liens
    if (data.skills) {
      data.skills = data.skills.map((skill) => ({
        ...skill,
        id: skill.id || uuidv4(),
      }))
    }

    if (data.professionalLinks) {
      data.professionalLinks = data.professionalLinks.map((link) => ({
        ...link,
        id: link.id || uuidv4(),
      }))
    }

    return freelance.update(data)
  }

  // Supprimer un freelance
  deleteFreelance(id) {
    const index = freelances.findIndex((f) => f.id === id)
    if (index === -1) {
      throw new Error("Freelance non trouvé")
    }

    const deletedFreelance = freelances.splice(index, 1)[0]
    return deletedFreelance
  }

  // Statistiques
  getStatistics() {
    const total = freelances.length
    const available = freelances.filter((f) => f.availability === "disponible").length
    const partiallyAvailable = freelances.filter((f) => f.availability === "partiellement_disponible").length
    const unavailable = freelances.filter((f) => f.availability === "indisponible").length

    const skillsCount = {}
    freelances.forEach((f) => {
      f.skills.forEach((skill) => {
        skillsCount[skill.name] = (skillsCount[skill.name] || 0) + 1
      })
    })

    const topSkills = Object.entries(skillsCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }))

    return {
      total,
      availability: {
        available,
        partiallyAvailable,
        unavailable,
      },
      topSkills,
    }
  }

  // Réinitialiser la base de données
  resetDatabase() {
    SeedService.resetDatabase(freelances)
    return { message: "Base de données réinitialisée avec succès", count: freelances.length }
  }

  // Ajouter des données de test supplémentaires
  addTestData(count = 5) {
    const initialCount = freelances.length
    SeedService.addMoreTestData(freelances, count)
    return {
      message: `${count} freelances supplémentaires ajoutés`,
      previousCount: initialCount,
      newCount: freelances.length,
    }
  }

  // Vider complètement la base de données
  clearDatabase() {
    const count = freelances.length
    freelances.length = 0
    console.log("🗑️ Base de données vidée")
    return { message: "Base de données vidée", deletedCount: count }
  }
}

module.exports = new FreelanceService()
