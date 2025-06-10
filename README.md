# Freelance Platform API

Une API REST complète pour la gestion de profils freelances, développée avec Express.js.

## 🚀 Fonctionnalités

- **CRUD complet** : Création, lecture, mise à jour et suppression de profils freelances
- **Gestion des compétences** : Ajout et organisation des compétences par niveau et catégorie
- **Liens professionnels** : Gestion des profils LinkedIn, GitHub, portfolios, etc.
- **Filtrage avancé** : Recherche par disponibilité, compétences, localisation
- **Statistiques** : Tableau de bord avec métriques des freelances
- **Documentation interactive** : Interface Swagger UI intégrée
- **Validation robuste** : Validation des données avec messages d'erreur détaillés

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
\`\`\`bash
git clone <url-du-repo>
cd freelance-platform-api
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Démarrer le serveur**
\`\`\`bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
\`\`\`

Le serveur démarre sur `http://localhost:3000`

## 📚 Documentation API

### Accès à la documentation
- **Swagger UI** : http://localhost:3000/api-docs
- **Health Check** : http://localhost:3000/health

### Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/freelances` | Liste tous les freelances |
| GET | `/api/freelances/:id` | Récupère un freelance spécifique |
| POST | `/api/freelances` | Crée un nouveau freelance |
| PUT | `/api/freelances/:id` | Met à jour un freelance |
| DELETE | `/api/freelances/:id` | Supprime un freelance |
| GET | `/api/freelances/stats` | Statistiques des freelances |

### Paramètres de filtrage

- `availability` : `disponible`, `partiellement_disponible`, `indisponible`
- `skill` : Recherche par nom de compétence (partielle)
- `location` : Recherche par localisation (partielle)
- `summary` : `true` pour un résumé des profils

## 🔧 Structure du projet

\`\`\`
src/
├── config/          # Configuration (Swagger, etc.)
├── controllers/     # Contrôleurs de routes
├── middleware/      # Middlewares personnalisés
├── models/          # Modèles de données
├── routes/          # Définition des routes
├── services/        # Logique métier
└── server.js        # Point d'entrée de l'application
\`\`\`

## 📊 Modèle de données

### Freelance
\`\`\`json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phone": "string",
  "title": "string",
  "description": "string",
  "location": "string",
  "hourlyRate": "number",
  "availability": "enum",
  "skills": [Skill],
  "professionalLinks": [ProfessionalLink],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
\`\`\`

### Skill
\`\`\`json
{
  "id": "uuid",
  "name": "string",
  "level": "debutant|intermediaire|avance|expert",
  "category": "string"
}
\`\`\`

### ProfessionalLink
\`\`\`json
{
  "id": "uuid",
  "type": "linkedin|github|portfolio|website|behance|dribbble|autre",
  "url": "string",
  "label": "string"
}
\`\`\`

## 🧪 Exemples d'utilisation

### Créer un freelance
\`\`\`bash
curl -X POST http://localhost:3000/api/freelances \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Dupont",
    "email": "alice.dupont@email.com",
    "title": "Développeuse React",
    "location": "Paris, France",
    "hourlyRate": 65,
    "skills": [
      {
        "name": "React",
        "level": "expert",
        "category": "Frontend"
      }
    ],
    "professionalLinks": [
      {
        "type": "github",
        "url": "https://github.com/alice-dupont"
      }
    ]
  }'
\`\`\`

### Rechercher des freelances
\`\`\`bash
# Tous les freelances disponibles
curl "http://localhost:3000/api/freelances?availability=disponible"

# Freelances avec compétence JavaScript
curl "http://localhost:3000/api/freelances?skill=javascript"

# Résumé des profils à Paris
curl "http://localhost:3000/api/freelances?location=paris&summary=true"
\`\`\`

### Statistiques
\`\`\`bash
curl http://localhost:3000/api/freelances/stats
\`\`\`

## 🔒 Sécurité

- **Helmet.js** : Protection contre les vulnérabilités communes
- **CORS** : Configuration des origines autorisées
- **Validation** : Validation stricte des données d'entrée
- **Sanitisation** : Nettoyage des données utilisateur

## 🚀 Déploiement

### Variables d'environnement
\`\`\`bash
PORT=3000
NODE_ENV=production
\`\`\`

### Docker (optionnel)
\`\`\`dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation Swagger

---

**Développé avec ❤️ pour simplifier la gestion des freelances**
