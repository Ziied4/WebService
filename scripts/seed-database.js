const seedData = require("../src/data/seedData")

console.log("🌱 Script de peuplement de la base de données")
console.log("===============================================")

console.log(`📊 Données disponibles:`)
console.log(`   - ${seedData.freelances.length} profils freelances`)

seedData.freelances.forEach((freelance, index) => {
  console.log(`   ${index + 1}. ${freelance.firstName} ${freelance.lastName} - ${freelance.title}`)
})

console.log("\n✅ Pour utiliser ces données:")
console.log("   1. Démarrez le serveur: npm run dev")
console.log("   2. Allez sur: http://localhost:3000/api-docs")
console.log("   3. Utilisez les endpoints /seed/* pour gérer les données")

console.log("\n🔧 Endpoints disponibles:")
console.log("   - POST /api/freelances/seed/reset  : Réinitialiser avec les données de base")
console.log("   - POST /api/freelances/seed/add    : Ajouter des données supplémentaires")
console.log("   - DELETE /api/freelances/seed/clear: Vider la base de données")
