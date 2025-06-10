const freelanceService = require("../services/freelanceService")
const { v4: uuidv4 } = require("uuid")

const resolvers = {
  Query: {
    // Récupérer tous les freelances avec filtres optionnels
    freelances: (parent, args) => {
      const { availability, skill, location } = args
      const filters = {}

      if (availability) filters.availability = availability
      if (skill) filters.skill = skill
      if (location) filters.location = location

      return freelanceService.getAllFreelances(filters)
    },

    // Récupérer un freelance par ID
    freelance: (parent, { id }) => {
      const freelance = freelanceService.getFreelanceById(id)
      if (!freelance) {
        throw new Error(`Freelance avec l'ID ${id} non trouvé`)
      }
      return freelance
    },

    // Récupérer les résumés des freelances
    freelanceSummaries: (parent, args) => {
      const { availability, skill, location } = args
      const filters = {}

      if (availability) filters.availability = availability
      if (skill) filters.skill = skill
      if (location) filters.location = location

      const freelances = freelanceService.getAllFreelances(filters)
      // Use service function instead of model method
      return freelances.map((f) => freelanceService.getFreelanceSummary(f))
    },

    // Récupérer les statistiques
    freelanceStats: () => {
      return freelanceService.getStatistics()
    },
  },

  Mutation: {
    // Créer un nouveau freelance
    createFreelance: (parent, { input }) => {
      try {
        // Ajouter des IDs aux compétences et liens si nécessaire
        const processedInput = {
          ...input,
          skills: input.skills
            ? input.skills.map((skill) => ({
                ...skill,
                id: uuidv4(),
              }))
            : [],
          professionalLinks: input.professionalLinks
            ? input.professionalLinks.map((link) => ({
                ...link,
                id: uuidv4(),
              }))
            : [],
        }

        return freelanceService.createFreelance(processedInput)
      } catch (error) {
        throw new Error(`Erreur lors de la création: ${error.message}`)
      }
    },

    // Mettre à jour un freelance
    updateFreelance: (parent, { id, input }) => {
      try {
        // Ajouter des IDs aux nouvelles compétences et liens si nécessaire
        const processedInput = {
          ...input,
        }

        if (input.skills) {
          processedInput.skills = input.skills.map((skill) => ({
            ...skill,
            id: skill.id || uuidv4(),
          }))
        }

        if (input.professionalLinks) {
          processedInput.professionalLinks = input.professionalLinks.map((link) => ({
            ...link,
            id: link.id || uuidv4(),
          }))
        }

        return freelanceService.updateFreelance(id, processedInput)
      } catch (error) {
        throw new Error(`Erreur lors de la mise à jour: ${error.message}`)
      }
    },

    // Supprimer un freelance
    deleteFreelance: (parent, { id }) => {
      try {
        return freelanceService.deleteFreelance(id)
      } catch (error) {
        throw new Error(`Erreur lors de la suppression: ${error.message}`)
      }
    },

    // Réinitialiser la base de données
    resetDatabase: () => {
      try {
        return freelanceService.resetDatabase()
      } catch (error) {
        throw new Error(`Erreur lors de la réinitialisation: ${error.message}`)
      }
    },

    // Ajouter des données de test
    addTestData: (parent, { count = 5 }) => {
      try {
        return freelanceService.addTestData(count)
      } catch (error) {
        throw new Error(`Erreur lors de l'ajout de données: ${error.message}`)
      }
    },

    // Vider la base de données
    clearDatabase: () => {
      try {
        return freelanceService.clearDatabase()
      } catch (error) {
        throw new Error(`Erreur lors du vidage: ${error.message}`)
      }
    },
  },

  // Resolvers pour les types personnalisés
  DateTime: {
    serialize: (date) => {
      return date instanceof Date ? date.toISOString() : date
    },
    parseValue: (value) => {
      return new Date(value)
    },
    parseLiteral: (ast) => {
      return new Date(ast.value)
    },
  },
}

module.exports = resolvers
