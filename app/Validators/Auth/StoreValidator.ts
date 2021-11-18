import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AuthStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email({
        sanitize: true,
        ignoreMaxLength: true,
        domainSpecificValidation: true,
      }),
    ]),
    password: schema.string({ trim: true }),
  })

  public messages = {}
}
