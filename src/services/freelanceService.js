const { v4: uuidv4 } = require("uuid")
const SeedService = require("./seedService")

// Stockage en mémoire (remplacer par une base de données en production)
const freelances = []

// Validation functions (moved from model)
function validateFreelance(data) {
  const errors = []

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("Le prénom doit contenir au moins 2 caractères")
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères")
  }

  if (!data.email || !isValidEmail(data.email)) {
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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Business logic functions (moved from model)
function createFreelanceObject(data) {
  return {
    id: data.id || uuidv4(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || null,
    title: data.title,
    description: data.description || null,
    location: data.location || null,
    hourlyRate: data.hourlyRate || null,
    availability: data.availability || "disponible",
    skills: data.skills || [],
    professionalLinks: data.professionalLinks || [],
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  }
}

function updateFreelanceObject(freelance, data) {
  Object.keys(data).forEach((key) => {
    if (key !== "id" && key !== "createdAt" && data[key] !== undefined) {
      freelance[key] = data[key]
    }
  })
  freelance.updatedAt = new Date().toISOString()
  return freelance
}

function getFreelanceSummary(freelance) {
  return {
    id: freelance.id,
    name: `${freelance.firstName} ${freelance.lastName}`,
    title: freelance.title,
    location: freelance.location,
    availability: freelance.availability,
    skillsCount: freelance.skills.length,
    hourlyRate: freelance.hourlyRate,
  }
}

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
    const errors = validateFreelance(data)
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

    const freelance = createFreelanceObject(data)
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
    const errors = validateFreelance(dataToValidate)
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

    return updateFreelanceObject(freelance, data)
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

  // Obtenir le résumé d'un freelance
  getFreelanceSummary(freelance) {
    return getFreelanceSummary(freelance)
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
