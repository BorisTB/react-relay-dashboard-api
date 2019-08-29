import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../types'

const login = async (parent, { email, password }, ctx: Context) => {
  const user = await ctx.db.user({ email })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ id: user.id }, process.env.APP_SECRET),
    user,
  }
}

export default login
