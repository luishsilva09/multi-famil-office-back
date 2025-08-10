import { FastifyInstance } from 'fastify'
import { createClient, deleteClient, listClient, updateClient, listClientById } from '../controllers/clientController'
import { createClientJsonSchema, updateClientJsonSchema } from '../schemas/clientSchema'

export async function clientRoutes(fastify: FastifyInstance) {
    fastify.post('/client', { schema: createClientJsonSchema }, createClient)
    fastify.get('/client',listClient)
    fastify.get('/client', listClientById)
    fastify.put('/client/:id', { schema: updateClientJsonSchema }, updateClient)
    fastify.delete('/client/:id', deleteClient)
}
