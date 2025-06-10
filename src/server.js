const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

async function startServer() {
  const app = express()
  const PORT = process.env.PORT || 3000

  // Middleware
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(cors())
  app.use(morgan("combined"))
  app.use(express.json({ limit: "10mb" }))

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      return {
        // Add any context data here
      }
    }
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "Freelance Platform GraphQL API",
      graphql: "/graphql"
    })
  })

  // Root endpoint
  app.get("/", (req, res) => {
    res.json({
      message: "Bienvenue sur l'API GraphQL Freelance Platform",
      graphql: "/graphql",
      health: "/health",
      playground: `http://localhost:${PORT}/graphql`
    })
  })

  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Endpoint non trouvé",
      path: req.originalUrl,
      suggestion: "Utilisez /graphql pour l'API GraphQL"
    })
  })

  app.listen(PORT, () => {
    console.log(`🚀 Serveur GraphQL démarré sur le port ${PORT}`)
    console.log(`🎮 GraphQL Playground disponible sur http://localhost:${PORT}/graphql`)
    console.log(`❤️  Health check sur http://localhost:${PORT}/health`)
  })
}

startServer().catch(error => {
  console.error('Erreur lors du démarrage du serveur:', error)
})
