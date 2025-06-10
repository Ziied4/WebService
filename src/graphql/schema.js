const { gql } = require("apollo-server-express")

const typeDefs = gql`
  scalar DateTime

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

  type FreelanceSummary {
    id: ID!
    name: String!
    title: String!
    location: String
    availability: AvailabilityStatus!
    skillsCount: Int!
    hourlyRate: Float
  }

  type AvailabilityStats {
    available: Int!
    partiallyAvailable: Int!
    unavailable: Int!
  }

  type TopSkill {
    skill: String!
    count: Int!
  }

  type FreelanceStats {
    total: Int!
    availability: AvailabilityStats!
    topSkills: [TopSkill!]!
  }

  type DatabaseResult {
    message: String!
    count: Int!
  }

  type TestDataResult {
    message: String!
    previousCount: Int!
    newCount: Int!
  }

  type ClearResult {
    message: String!
    deletedCount: Int!
  }

  input SkillInput {
    name: String!
    level: SkillLevel!
    category: String
  }

  input ProfessionalLinkInput {
    type: LinkType!
    url: String!
    label: String
  }

  input FreelanceInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    title: String!
    description: String
    location: String
    hourlyRate: Float
    availability: AvailabilityStatus
    skills: [SkillInput!]
    professionalLinks: [ProfessionalLinkInput!]
  }

  input FreelanceUpdateInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    title: String
    description: String
    location: String
    hourlyRate: Float
    availability: AvailabilityStatus
    skills: [SkillInput!]
    professionalLinks: [ProfessionalLinkInput!]
  }

  type Query {
    freelances(
      availability: AvailabilityStatus
      skill: String
      location: String
    ): [Freelance!]!
    
    freelance(id: ID!): Freelance
    
    freelanceSummaries(
      availability: AvailabilityStatus
      skill: String
      location: String
    ): [FreelanceSummary!]!
    
    freelanceStats: FreelanceStats!
  }

  type Mutation {
    createFreelance(input: FreelanceInput!): Freelance!
    updateFreelance(id: ID!, input: FreelanceUpdateInput!): Freelance!
    deleteFreelance(id: ID!): Freelance!
    
    # Database management
    resetDatabase: DatabaseResult!
    addTestData(count: Int): TestDataResult!
    clearDatabase: ClearResult!
  }
`

module.exports = typeDefs
