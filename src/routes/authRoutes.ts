import { FastifyInstance } from 'fastify'
import { createUser, loginUser } from '../controllers/authController'
import { loginUserJsonSchema, createUserJsonSchema } from '../schemas/userSchema'

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', { schema: createUserJsonSchema }, createUser)
    fastify.post('/login', { schema: loginUserJsonSchema }, loginUser )
}
