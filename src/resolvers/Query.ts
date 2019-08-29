import { Context } from 'types'

export const Query = {
  me (parent, args, ctx: Context) {
    return ctx.user
  }
}
