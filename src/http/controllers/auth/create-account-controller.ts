import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PasswordInsecureError } from '@/use-cases/_errors/password-insecure-error'
import { UserEmailAlreadyExistsError } from '@/use-cases/_errors/user-email-already-exists-error'
import { makeCreateAccountUseCase } from '@/use-cases/_factories/users/make-create-account-use-case'

export const createAccount = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/create-account',
    {
      schema: {
        tags: ['auth'],
        summary: 'Criar nova conta',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          username: z.string().min(2),
          password: z
            .string()
            .min(8)
            .refine(
              (password) => /[a-z]/i.test(password) && /\d/.test(password) && /\W/.test(password)
            ),
        }),
        response: {
          400: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, username } = request.body

      try {
        const createAccountUseCase = makeCreateAccountUseCase()

        await createAccountUseCase.execute({
          name,
          email,
          username,
          password,
        })
      } catch (err) {
        if (err instanceof UserEmailAlreadyExistsError) {
          return reply.status(409).send({ message: err.message })
        }

        if (err instanceof PasswordInsecureError) {
          return reply.status(400).send({ message: err.message })
        }

        throw err
      }

      reply.status(201).send()
    }
  )
}
