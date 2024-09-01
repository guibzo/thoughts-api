import fastify from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running at port ${env.PORT}!`)
  })
