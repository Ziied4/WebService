const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Freelance Platform API",
      version: "1.0.0",
      description:
        "API de gestion de profils freelances - Permet la création, consultation, mise à jour et suppression de profils freelances avec leurs compétences et liens professionnels.",
      contact: {
        name: "Support API",
        email: "support@freelanceplatform.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
    components: {
      schemas: {
        Freelance: {
          type: "object",
          required: ["firstName", "lastName", "email", "title"],
          properties: {
            id: {
              type: "string",
              description: "Identifiant unique du freelance",
              example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            },
            firstName: {
              type: "string",
              description: "Prénom du freelance",
              example: "Jean",
            },
            lastName: {
              type: "string",
              description: "Nom de famille du freelance",
              example: "Dupont",
            },
            email: {
              type: "string",
              format: "email",
              description: "Adresse email du freelance",
              example: "jean.dupont@email.com",
            },
            phone: {
              type: "string",
              description: "Numéro de téléphone",
              example: "+33 6 12 34 56 78",
            },
            title: {
              type: "string",
              description: "Titre professionnel",
              example: "Développeur Full Stack",
            },
            description: {
              type: "string",
              description: "Description du profil",
              example: "Développeur passionné avec 5 ans d'expérience...",
            },
            location: {
              type: "string",
              description: "Localisation",
              example: "Paris, France",
            },
            hourlyRate: {
              type: "number",
              description: "Tarif horaire en euros",
              example: 65,
            },
            availability: {
              type: "string",
              enum: ["disponible", "partiellement_disponible", "indisponible"],
              description: "Statut de disponibilité",
              example: "disponible",
            },
            skills: {
              type: "array",
              items: { $ref: "#/components/schemas/Skill" },
            },
            professionalLinks: {
              type: "array",
              items: { $ref: "#/components/schemas/ProfessionalLink" },
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date de création",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date de dernière mise à jour",
            },
          },
        },
        Skill: {
          type: "object",
          required: ["name", "level"],
          properties: {
            id: {
              type: "string",
              description: "Identifiant unique de la compétence",
            },
            name: {
              type: "string",
              description: "Nom de la compétence",
              example: "JavaScript",
            },
            level: {
              type: "string",
              enum: ["debutant", "intermediaire", "avance", "expert"],
              description: "Niveau de maîtrise",
              example: "avance",
            },
            category: {
              type: "string",
              description: "Catégorie de la compétence",
              example: "Programmation",
            },
          },
        },
        ProfessionalLink: {
          type: "object",
          required: ["type", "url"],
          properties: {
            id: {
              type: "string",
              description: "Identifiant unique du lien",
            },
            type: {
              type: "string",
              enum: ["linkedin", "github", "portfolio", "website", "behance", "dribbble", "autre"],
              description: "Type de lien professionnel",
              example: "linkedin",
            },
            url: {
              type: "string",
              format: "uri",
              description: "URL du lien",
              example: "https://linkedin.com/in/jean-dupont",
            },
            label: {
              type: "string",
              description: "Libellé personnalisé du lien",
              example: "Mon profil LinkedIn",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Message d'erreur",
            },
            details: {
              type: "object",
              description: "Détails supplémentaires sur l'erreur",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
}

module.exports = { swaggerOptions }
