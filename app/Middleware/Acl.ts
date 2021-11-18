import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.authenticate()

    if (!allowedRoles.includes(user.role)) {
      return response.unauthorized({ error: { message: 'access denied' } })
    }

    await next()
  }
}
