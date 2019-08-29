import { Prisma, User } from '../generated/prisma-client'

export interface Context {
  db: Prisma
  request: any
  user?: User
}
