import { FastifyInstance } from 'fastify'
import { createUser } from '../controllers/clientController'
import { createUserSchema } from '../schemas/clientSchema'

export async function clientRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/users',
        {
            schema: {
                body: createUserSchema.shape.body,
            },
        },
        createUser
    )
}
