const express = require("express")
const freelanceController = require("../controllers/freelanceController")

const router = express.Router()

/**
 * @swagger
 * /api/freelances:
 *   get:
 *     summary: Récupère la liste de tous les freelances
 *     tags: [Freelances]
 *     parameters:
 *       - in: query
 *         name: availability
 *         schema:
 *           type: string
 *           enum: [disponible, partiellement_disponible, indisponible]
 *         description: Filtrer par statut de disponibilité
 *       - in: query
 *         name: skill
 *         schema:
 *           type: string
 *         description: Filtrer par compétence (recherche partielle)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtrer par localisation (recherche partielle)
 *       - in: query
 *         name: summary
 *         schema:
 *           type: boolean
 *         description: Retourner seulement un résumé des profils
 *     responses:
 *       200:
 *         description: Liste des freelances récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Freelance'
 *                 filters:
 *                   type: object
 */
router.get("/", freelanceController.getAllFreelances)

/**
 * @swagger
 * /api/freelances/stats:
 *   get:
 *     summary: Récupère les statistiques des freelances
 *     tags: [Freelances]
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     availability:
 *                       type: object
 *                       properties:
 *                         available:
 *                           type: number
 *                         partiallyAvailable:
 *                           type: number
 *                         unavailable:
 *                           type: number
 *                     topSkills:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           skill:
 *                             type: string
 *                           count:
 *                             type: number
 */
router.get("/stats", freelanceController.getStatistics)

/**
 * @swagger
 * /api/freelances/{id}:
 *   get:
 *     summary: Récupère un freelance par son ID
 *     tags: [Freelances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du freelance
 *     responses:
 *       200:
 *         description: Freelance trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Freelance'
 *       404:
 *         description: Freelance non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", freelanceController.getFreelanceById)

/**
 * @swagger
 * /api/freelances:
 *   post:
 *     summary: Crée un nouveau profil freelance
 *     tags: [Freelances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Freelance'
 *           example:
 *             firstName: "Sophie"
 *             lastName: "Bernard"
 *             email: "sophie.bernard@email.com"
 *             phone: "+33 6 11 22 33 44"
 *             title: "Consultante Marketing Digital"
 *             description: "Experte en stratégie digitale et growth hacking"
 *             location: "Bordeaux, France"
 *             hourlyRate: 60
 *             availability: "disponible"
 *             skills:
 *               - name: "Google Ads"
 *                 level: "expert"
 *                 category: "Marketing"
 *               - name: "SEO"
 *                 level: "avance"
 *                 category: "Marketing"
 *             professionalLinks:
 *               - type: "linkedin"
 *                 url: "https://linkedin.com/in/sophie-bernard"
 *                 label: "LinkedIn"
 *     responses:
 *       201:
 *         description: Freelance créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Freelance'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", freelanceController.createFreelance)

/**
 * @swagger
 * /api/freelances/{id}:
 *   put:
 *     summary: Met à jour un profil freelance
 *     tags: [Freelances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du freelance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Freelance'
 *           example:
 *             title: "Senior Marketing Digital Consultant"
 *             hourlyRate: 70
 *             availability: "partiellement_disponible"
 *     responses:
 *       200:
 *         description: Freelance mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Freelance'
 *       404:
 *         description: Freelance non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", freelanceController.updateFreelance)

/**
 * @swagger
 * /api/freelances/{id}:
 *   delete:
 *     summary: Supprime un profil freelance
 *     tags: [Freelances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du freelance
 *     responses:
 *       200:
 *         description: Freelance supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Freelance'
 *       404:
 *         description: Freelance non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", freelanceController.deleteFreelance)

/**
 * @swagger
 * /api/freelances/seed/reset:
 *   post:
 *     summary: Réinitialise la base de données avec les données de test
 *     tags: [Database Management]
 *     responses:
 *       200:
 *         description: Base de données réinitialisée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 count:
 *                   type: number
 */
router.post("/seed/reset", freelanceController.resetDatabase)

/**
 * @swagger
 * /api/freelances/seed/add:
 *   post:
 *     summary: Ajoute des freelances de test supplémentaires
 *     tags: [Database Management]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *                 default: 5
 *                 description: Nombre de freelances à ajouter
 *     responses:
 *       200:
 *         description: Freelances ajoutés avec succès
 */
router.post("/seed/add", freelanceController.addTestData)

/**
 * @swagger
 * /api/freelances/seed/clear:
 *   delete:
 *     summary: Vide complètement la base de données
 *     tags: [Database Management]
 *     responses:
 *       200:
 *         description: Base de données vidée avec succès
 */
router.delete("/seed/clear", freelanceController.clearDatabase)

module.exports = router
