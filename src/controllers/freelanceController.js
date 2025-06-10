const freelanceService = require("../services/freelanceService")

class FreelanceController {
  // GET /api/freelances
  async getAllFreelances(req, res, next) {
    try {
      const { availability, skill, location, summary } = req.query
      const filters = { availability, skill, location }

      const freelances = freelanceService.getAllFreelances(filters)

      // Si summary=true, retourner seulement un résumé
      const result = summary === "true" ? freelances.map((f) => f.getSummary()) : freelances

      res.json({
        success: true,
        count: result.length,
        data: result,
        filters: Object.keys(filters).reduce((acc, key) => {
          if (filters[key]) acc[key] = filters[key]
          return acc
        }, {}),
      })
    } catch (error) {
      next(error)
    }
  }

  // GET /api/freelances/:id
  async getFreelanceById(req, res, next) {
    try {
      const { id } = req.params
      const freelance = freelanceService.getFreelanceById(id)

      if (!freelance) {
        return res.status(404).json({
          success: false,
          error: "Freelance non trouvé",
        })
      }

      res.json({
        success: true,
        data: freelance,
      })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/freelances
  async createFreelance(req, res, next) {
    try {
      const freelance = freelanceService.createFreelance(req.body)

      res.status(201).json({
        success: true,
        message: "Freelance créé avec succès",
        data: freelance,
      })
    } catch (error) {
      if (error.message.includes("validation") || error.message.includes("existe déjà")) {
        return res.status(400).json({
          success: false,
          error: error.message,
        })
      }
      next(error)
    }
  }

  // PUT /api/freelances/:id
  async updateFreelance(req, res, next) {
    try {
      const { id } = req.params
      const freelance = freelanceService.updateFreelance(id, req.body)

      res.json({
        success: true,
        message: "Freelance mis à jour avec succès",
        data: freelance,
      })
    } catch (error) {
      if (error.message === "Freelance non trouvé") {
        return res.status(404).json({
          success: false,
          error: error.message,
        })
      }
      if (error.message.includes("validation") || error.message.includes("existe déjà")) {
        return res.status(400).json({
          success: false,
          error: error.message,
        })
      }
      next(error)
    }
  }

  // DELETE /api/freelances/:id
  async deleteFreelance(req, res, next) {
    try {
      const { id } = req.params
      const deletedFreelance = freelanceService.deleteFreelance(id)

      res.json({
        success: true,
        message: "Freelance supprimé avec succès",
        data: deletedFreelance,
      })
    } catch (error) {
      if (error.message === "Freelance non trouvé") {
        return res.status(404).json({
          success: false,
          error: error.message,
        })
      }
      next(error)
    }
  }

  // GET /api/freelances/stats
  async getStatistics(req, res, next) {
    try {
      const stats = freelanceService.getStatistics()

      res.json({
        success: true,
        data: stats,
      })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/freelances/seed/reset
  async resetDatabase(req, res, next) {
    try {
      const result = freelanceService.resetDatabase()
      res.json({
        success: true,
        message: result.message,
        count: result.count,
      })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/freelances/seed/add
  async addTestData(req, res, next) {
    try {
      const { count = 5 } = req.body
      const result = freelanceService.addTestData(count)
      res.json({
        success: true,
        message: result.message,
        previousCount: result.previousCount,
        newCount: result.newCount,
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE /api/freelances/seed/clear
  async clearDatabase(req, res, next) {
    try {
      const result = freelanceService.clearDatabase()
      res.json({
        success: true,
        message: result.message,
        deletedCount: result.deletedCount,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FreelanceController()
