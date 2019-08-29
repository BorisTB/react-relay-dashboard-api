import { Prisma, User } from '../../prisma/generated/prisma-client'

export interface Context {
  db: Prisma
  request: any
  user?: User
}
