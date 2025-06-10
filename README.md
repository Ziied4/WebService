# Freelance Platform API GraphQL

Une API GraphQL complète pour la gestion de profils freelances, développée avec Express.js et Apollo Server.

## 🚀 Fonctionnalités

- **API GraphQL complète** : Queries, Mutations et types personnalisés
- **CRUD complet** : Création, lecture, mise à jour et suppression de profils freelances
- **Gestion des compétences** : Ajout et organisation des compétences par niveau et catégorie
- **Liens professionnels** : Gestion des profils LinkedIn, GitHub, portfolios, etc.
- **Filtrage avancé** : Recherche par disponibilité, compétences, localisation
- **Statistiques** : Tableau de bord avec métriques des freelances
- **GraphQL Playground** : Interface interactive pour tester l'API
- **Données de test** : 8 profils freelances complets pour les tests

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
\`\`\`
git clone <url-du-repo>
cd freelance-platform-api
\`\`\`

2. **Installer les dépendances**
\`\`\`
npm install
\`\`\`

3. **Démarrer le serveur**
\`\`\`
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
\`\`\`

Le serveur démarre sur `http://localhost:3000`

## 📚 Documentation API

### Accès à l'interface GraphQL
- **GraphQL Playground** : http://localhost:3000/graphql
- **Health Check** : http://localhost:3000/health

### Schema GraphQL principal

#### Types de base
\`\`\`graphql
type Freelance {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phone: String
  title: String!
  description: String
  location: String
  hourlyRate: Float
  availability: AvailabilityStatus!
  skills: [Skill!]!
  professionalLinks: [ProfessionalLink!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Skill {
  id: ID!
  name: String!
  level: SkillLevel!
  category: String
}

type ProfessionalLink {
  id: ID!
  type: LinkType!
  url: String!
  label: String
}
\`\`\`

#### Enums
\`\`\`graphql
enum AvailabilityStatus {
  disponible
  partiellement_disponible
  indisponible
}

enum SkillLevel {
  debutant
  intermediaire
  avance
  expert
}

enum LinkType {
  linkedin
  github
  portfolio
  website
  behance
  dribbble
  autre
}
\`\`\`

## 🔧 Structure du projet

\`\`\`
src/
├── data/            # Données de test prédéfinies
├── graphql/         # Schémas et resolvers GraphQL
│   ├── schema.js    # Définition du schéma GraphQL
│   └── resolvers.js # Resolvers pour queries et mutations
├── models/          # Modèles de données et validation
├── services/        # Logique métier et gestion des données
└── server.js        # Point d'entrée de l'application
\`\`\`

## 🧪 Exemples d'utilisation

### Queries (Lecture de données)

#### Récupérer tous les freelances
\`\`\`graphql
query {
  freelances {
    id
    firstName
    lastName
    title
    availability
    skills {
      name
      level
      category
    }
    professionalLinks {
      type
      url
      label
    }
  }
}
\`\`\`

#### Filtrer par disponibilité
\`\`\`graphql
query {
  freelances(availability: disponible) {
    firstName
    lastName
    title
    hourlyRate
  }
}
\`\`\`

#### Rechercher par compétence
\`\`\`graphql
query {
  freelances(skill: "JavaScript") {
    firstName
    lastName
    title
    skills {
      name
      level
    }
  }
}
\`\`\`

#### Récupérer un freelance spécifique
\`\`\`graphql
query GetFreelance($id: ID!) {
  freelance(id: $id) {
    firstName
    lastName
    email
    title
    description
    skills {
      name
      level
      category
    }
  }
}
\`\`\`

#### Obtenir des statistiques
\`\`\`graphql
query {
  freelanceStats {
    total
    availability {
      available
      partiallyAvailable
      unavailable
    }
    topSkills {
      skill
      count
    }
  }
}
\`\`\`

### Mutations (Modification de données)

#### Créer un nouveau freelance
\`\`\`graphql
mutation {
  createFreelance(input: {
    firstName: "Alice"
    lastName: "Dupont"
    email: "alice.dupont@email.com"
    title: "Développeuse React"
    description: "Développeuse frontend spécialisée en React"
    location: "Paris, France"
    hourlyRate: 65
    availability: disponible
    skills: [
      {
        name: "React"
        level: expert
        category: "Frontend"
      }
      {
        name: "TypeScript"
        level: avance
        category: "Programmation"
      }
    ]
    professionalLinks: [
      {
        type: github
        url: "https://github.com/alice-dupont"
        label: "GitHub"
      }
      {
        type: linkedin
        url: "https://linkedin.com/in/alice-dupont"
        label: "LinkedIn"
      }
    ]
  }) {
    id
    firstName
    lastName
    email
  }
}
\`\`\`

#### Mettre à jour un freelance
\`\`\`graphql
mutation UpdateFreelance($id: ID!) {
  updateFreelance(
    id: $id
    input: {
      title: "Senior React Developer"
      hourlyRate: 75
      availability: partiellement_disponible
    }
  ) {
    id
    title
    hourlyRate
    availability
    updatedAt
  }
}
\`\`\`

#### Supprimer un freelance
\`\`\`graphql
mutation DeleteFreelance($id: ID!) {
  deleteFreelance(id: $id) {
    id
    firstName
    lastName
  }
}
\`\`\`

### Gestion des données de test

#### Réinitialiser la base de données
\`\`\`graphql
mutation {
  resetDatabase {
    message
    count
  }
}
\`\`\`

#### Ajouter des freelances de test
\`\`\`graphql
mutation {
  addTestData(count: 3) {
    message
    previousCount
    newCount
  }
}
\`\`\`

#### Vider la base de données
\`\`\`graphql
mutation {
  clearDatabase {
    message
    deletedCount
  }
}
\`\`\`

## 📊 Données de test incluses

La base de données se remplit automatiquement avec **8 profils freelances complets** :

1. **Marie Martin** - Designer UX/UI Senior (Lyon) - 75€/h
2. **Thomas Dubois** - Développeur Full Stack JavaScript (Paris) - 85€/h
3. **Sophie Bernard** - Consultante Marketing Digital (Bordeaux) - 70€/h
4. **Alexandre Petit** - Data Scientist & ML Engineer (Toulouse) - 90€/h
5. **Camille Rousseau** - Développeuse Mobile React Native (Nantes) - 65€/h
6. **Julien Moreau** - Consultant DevOps & Cloud Architect (Lille) - 95€/h
7. **Emma Leroy** - Rédactrice Web & Content Manager (Montpellier) - 45€/h
8. **Lucas Garcia** - Consultant Cybersécurité & Pentester (Nice) - 100€/h

Chaque profil inclut :
- Informations personnelles complètes
- 5-10 compétences avec niveaux (débutant à expert)
- 2-4 liens professionnels (LinkedIn, GitHub, Portfolio, etc.)
- Différents statuts de disponibilité
- Descriptions professionnelles détaillées

## 🎯 Avantages de GraphQL

### 1. Requêtes flexibles
\`\`\`graphql
# Demander seulement ce dont vous avez besoin
query MinimalInfo {
  freelances {
    firstName
    lastName
  }
}

# Ou obtenir des informations complètes
query CompleteInfo {
  freelances {
    firstName
    lastName
    email
    skills {
      name
      level
    }
    professionalLinks {
      type
      url
    }
  }
}
\`\`\`

### 2. Une seule requête pour plusieurs données
\`\`\`graphql
query Dashboard {
  freelances {
    firstName
    lastName
  }
  
  stats: freelanceStats {
    total
    availability {
      available
    }
  }
}
\`\`\`

### 3. Typage fort et validation automatique
- Validation automatique des types de données
- Auto-complétion dans GraphQL Playground
- Documentation générée automatiquement

## 🧪 Tests rapides

### Via GraphQL Playground (Recommandé)

1. Ouvrez http://localhost:3000/graphql
2. Utilisez les exemples de requêtes ci-dessus
3. Explorez le schéma avec l'auto-complétion
4. Consultez la documentation intégrée

### Via curl

\`\`\`bash
# Récupérer tous les freelances
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ freelances { firstName lastName title } }"}'

# Obtenir les statistiques
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ freelanceStats { total availability { available } } }"}'
\`\`\`

## 🔍 Requêtes avancées

### Recherche multi-critères
\`\`\`graphql
query AdvancedSearch {
  # Développeurs JavaScript disponibles
  jsDevs: freelances(skill: "JavaScript", availability: disponible) {
    firstName
    lastName
    hourlyRate
  }
  
  # Designers à Lyon
  lyonDesigners: freelances(skill: "Design", location: "Lyon") {
    firstName
    lastName
    title
  }
}
\`\`\`

### Analyse des compétences
\`\`\`graphql
query SkillAnalysis {
  freelances {
    firstName
    lastName
    skills {
      name
      level
      category
    }
  }
  
  stats: freelanceStats {
    topSkills {
      skill
      count
    }
  }
}
\`\`\`

## 🔒 Sécurité

- **Helmet.js** : Protection contre les vulnérabilités communes
- **CORS** : Configuration des origines autorisées
- **Validation GraphQL** : Validation automatique des types et schémas
- **Sanitisation** : Nettoyage des données utilisateur
- **Gestion d'erreurs** : Messages d'erreur sécurisés

## 🚀 Déploiement

### Variables d'environnement
\`\`\`bash
PORT=3000
NODE_ENV=production
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Commandes de déploiement
\`\`\`bash
# Build pour production
npm run start

# Avec PM2 (recommandé)
npm install -g pm2
pm2 start src/server.js --name "freelance-api"
\`\`\`

## 🔄 Workflow de développement

### 1. Tests recommandés
\`\`\`bash
# Démarrer le serveur
npm run dev

# Tester dans l'ordre :
# 1. Vérifier les statistiques
# 2. Lister tous les freelances
# 3. Tester les filtres
# 4. Créer un nouveau freelance
# 5. Modifier un freelance
# 6. Supprimer un freelance
\`\`\`

### 2. Ajout de nouvelles fonctionnalités

#### Ajouter un nouveau champ :
1. Modifier le schema GraphQL
2. Mettre à jour le modèle
3. Les resolvers fonctionnent automatiquement

#### Ajouter une nouvelle requête :
1. Ajouter au schema
2. Créer le resolver
3. Implémenter la logique dans le service

## 🛠️ Extensions possibles

### Prochaines étapes recommandées :

1. **Base de données persistante**
   - MongoDB avec Mongoose
   - PostgreSQL avec Prisma
   - Supabase pour une solution complète

2. **Authentification**
   - JWT tokens
   - Rôles utilisateurs (freelance, client, admin)
   - Protection des mutations sensibles

3. **Upload de fichiers**
   - Photos de profil
   - CV et portfolios
   - Intégration avec Cloudinary ou AWS S3

4. **Notifications en temps réel**
   - GraphQL Subscriptions
   - WebSockets pour les mises à jour live

5. **Recherche avancée**
   - Elasticsearch pour la recherche full-text
   - Filtres géographiques
   - Recommandations basées sur l'IA

6. **API REST complémentaire**
   - Endpoints REST pour l'intégration legacy
   - Webhooks pour les notifications externes

## 🧪 Tests et qualité

### Tests unitaires (à implémenter)
\`\`\`bash
# Installation des dépendances de test
npm install --save-dev jest supertest

# Lancer les tests
npm test
\`\`\`

### Linting et formatage
\`\`\`bash
# Installation
npm install --save-dev eslint prettier

# Configuration
npm run lint
npm run format
\`\`\`

## 📈 Performance

### Optimisations actuelles :
- Stockage en mémoire pour des accès rapides
- Validation côté serveur
- Gestion d'erreurs centralisée

### Optimisations futures :
- DataLoader pour éviter le problème N+1
- Cache Redis pour les requêtes fréquentes
- Pagination pour les grandes listes
- Rate limiting pour éviter les abus

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

### Standards de code :
- Utiliser des noms de variables explicites
- Commenter les fonctions complexes
- Suivre la structure existante
- Ajouter des tests pour les nouvelles fonctionnalités

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation GraphQL Playground
- Rejoindre notre Discord de développement

## 📚 Ressources utiles

### Documentation GraphQL :
- [GraphQL.org](https://graphql.org/) - Documentation officielle
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Documentation Apollo
- [GraphQL Playground](https://github.com/graphql/graphql-playground) - Interface de test

### Tutoriels recommandés :
- [How to GraphQL](https://www.howtographql.com/) - Tutoriel complet
- [Apollo GraphQL Tutorial](https://www.apollographql.com/tutorials/) - Tutoriels Apollo

## 🎉 Remerciements

Merci à tous les contributeurs et à la communauté GraphQL pour leurs outils exceptionnels !

---

**Développé avec ❤️ pour simplifier la gestion des freelances avec GraphQL**
