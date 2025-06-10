const errorHandler = (err, req, res, next) => {
  console.error("Erreur:", err)

  // Erreur de validation JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Format JSON invalide",
      details: err.message,
    })
  }

  // Erreur personnalisée
  if (err.message) {
    return res.status(500).json({
      success: false,
      error: "Erreur interne du serveur",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    })
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    error: "Erreur interne du serveur",
  })
}

module.exports = errorHandler
