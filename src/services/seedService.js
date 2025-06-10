const seedData = require("../data/seedData")
const { v4: uuidv4 } = require("uuid")

// Helper function to create freelance objects (replaces model constructor)
function createFreelanceObject(freelanceData) {
  return {
    id: uuidv4(),
    firstName: freelanceData.firstName,
    lastName: freelanceData.lastName,
    email: freelanceData.email,
    phone: freelanceData.phone || null,
    title: freelanceData.title,
    description: freelanceData.description || null,
    location: freelanceData.location || null,
    hourlyRate: freelanceData.hourlyRate || null,
    availability: freelanceData.availability || "disponible",
    skills: freelanceData.skills || [],
    professionalLinks: freelanceData.professionalLinks || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

class SeedService {
  // Fonction pour initialiser la base de données avec des données de test
  static initializeDatabase(freelancesArray) {
    console.log(" Initialisation de la base de données avec des données de test...")

    // Vider le tableau existant
    freelancesArray.length = 0

    // Ajouter les données de test
    seedData.freelances.forEach((freelanceData, index) => {
      // Ajouter des IDs uniques aux compétences et liens
      const processedData = {
        ...freelanceData,
        skills: freelanceData.skills.map((skill) => ({
          ...skill,
          id: uuidv4(),
        })),
        professionalLinks: freelanceData.professionalLinks.map((link) => ({
          ...link,
          id: uuidv4(),
        })),
      }

      const freelance = createFreelanceObject(processedData)
      freelancesArray.push(freelance)

      console.log(` Freelance ${index + 1}/8 ajouté: ${freelance.firstName} ${freelance.lastName}`)
    })

    console.log(` Base de données initialisée avec ${freelancesArray.length} freelances`)
    console.log(" Répartition par disponibilité:")

    const stats = this.getInitializationStats(freelancesArray)
    console.log(`   - Disponibles: ${stats.available}`)
    console.log(`   - Partiellement disponibles: ${stats.partiallyAvailable}`)
    console.log(`   - Indisponibles: ${stats.unavailable}`)
    console.log(` Tarif moyen: ${stats.averageRate}€/h`)
  }

  // Statistiques d'initialisation
  static getInitializationStats(freelancesArray) {
    const available = freelancesArray.filter((f) => f.availability === "disponible").length
    const partiallyAvailable = freelancesArray.filter((f) => f.availability === "partiellement_disponible").length
    const unavailable = freelancesArray.filter((f) => f.availability === "indisponible").length

    const totalRate = freelancesArray.reduce((sum, f) => sum + (f.hourlyRate || 0), 0)
    const averageRate = Math.round(totalRate / freelancesArray.length)

    return {
      available,
      partiallyAvailable,
      unavailable,
      averageRate,
    }
  }

  // Ajouter des freelances supplémentaires pour les tests
  static addMoreTestData(freelancesArray, count = 5) {
    console.log(` Ajout de ${count} freelances supplémentaires pour les tests...`)

    const additionalFreelances = [
      {
        firstName: "Pierre",
        lastName: "Durand",
        email: "pierre.durand@email.com",
        title: "Consultant SAP",
        location: "Strasbourg, France",
        hourlyRate: 110,
        availability: "disponible",
        skills: [
          { name: "SAP", level: "expert", category: "ERP" },
          { name: "ABAP", level: "avance", category: "Programmation" },
        ],
        professionalLinks: [{ type: "linkedin", url: "https://linkedin.com/in/pierre-durand-sap", label: "LinkedIn" }],
      },
      {
        firstName: "Léa",
        lastName: "Fontaine",
        email: "lea.fontaine@email.com",
        title: "Traductrice Technique",
        location: "Remote",
        hourlyRate: 35,
        availability: "disponible",
        skills: [
          { name: "Traduction", level: "expert", category: "Linguistique" },
          { name: "Anglais", level: "expert", category: "Langues" },
          { name: "Allemand", level: "avance", category: "Langues" },
        ],
        professionalLinks: [{ type: "linkedin", url: "https://linkedin.com/in/lea-fontaine-trad", label: "LinkedIn" }],
      },
    ]

    additionalFreelances.slice(0, count).forEach((freelanceData, index) => {
      const processedData = {
        ...freelanceData,
        description: `Description professionnelle pour ${freelanceData.firstName} ${freelanceData.lastName}`,
        phone: `+33 6 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
        skills: freelanceData.skills.map((skill) => ({
          ...skill,
          id: uuidv4(),
        })),
        professionalLinks: freelanceData.professionalLinks.map((link) => ({
          ...link,
          id: uuidv4(),
        })),
      }

      const freelance = createFreelanceObject(processedData)
      freelancesArray.push(freelance)

      console.log(
        ` Freelance supplémentaire ${index + 1}/${count} ajouté: ${freelance.firstName} ${freelance.lastName}`,
      )
    })
  }

  // Réinitialiser complètement la base de données
  static resetDatabase(freelancesArray) {
    console.log(" Réinitialisation complète de la base de données...")
    this.initializeDatabase(freelancesArray)
  }
}

module.exports = SeedService
