import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { authMiddleware } from './middlewares'
import resolvers from './resolvers'
import 'graphql-import-node'
import * as typeDefs from './schema.graphql'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [authMiddleware],
  context: request => ({
    ...request,
    db: prisma,
  }),
})

server.start({ endpoint: '/graphql' }, () => console.log(`Server is running on http://localhost:4000`))
