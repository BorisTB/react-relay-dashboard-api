import * as jwt from 'jsonwebtoken'
import { Context } from 'types'

const authMiddleware = async (resolve, parent, args, ctx: Context) => {
  const authHeaderValue = ctx.request.get('Authorization')

  if (authHeaderValue) {
    const [prefix, token] = authHeaderValue.split(' ')

    if (prefix === 'Bearer' && token) {
      try {
        const { id } = jwt.verify(token, process.env.APP_SECRET) as { id: string }
        ctx.user = await ctx.db.user({ id })
      } catch {
      }
    }
  }

  return resolve()
}

export default authMiddleware
