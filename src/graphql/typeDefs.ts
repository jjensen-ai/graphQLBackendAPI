import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type user {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getAllEmployees: [employee]
    getEmployee(id: ID): employee
    login(username: String!, password: String!): user
  }

  type Mutation{
    signUp(username: String!, email: String!, password: String!): user
    addEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): employee
    updateEmployee(id: ID!, firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): employee
    deleteEmployee(id: ID!): String
  }
`;