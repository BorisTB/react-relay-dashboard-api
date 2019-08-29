import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { authMiddleware } from './middlewares'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [authMiddleware],
  context: request => ({
    ...request,
    db: prisma,
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
