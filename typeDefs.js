import { gql } from "apollo-server-express";

export const typeDefs = gql`

type Msg {
  code: String
  message: String
}

type Task {
  id: ID
  title: String
  description: String
}

input TaskInput {
  title: String
  description: String
}

type Query {
  taskFindMany: [Task!]! 
  taskFindUnique(id: ID!): Task
}

type Mutation {
  taskCreate(task: TaskInput!): Task
  taskDelete(id: ID!): Msg
  taskUpdate(id: ID!, task: TaskInput): Task
}
`