import { FastifyInstance } from 'fastify'
import { createClient, deleteClient, listClient, updateClient, listClientById } from '../controllers/clientController'
import { createClientJsonSchema, updateClientJsonSchema } from '../schemas/clientSchema'

export async function clientRoutes(fastify: FastifyInstance) {
    fastify.post('/client', { 
        schema: createClientJsonSchema,
        preHandler: [fastify.authenticate]
    }, createClient)
    fastify.get('/client', { preHandler: [fastify.authenticate] }, listClient)
    fastify.get('/client/:id', { preHandler: [fastify.authenticate] }, listClientById)
    fastify.put(
        '/client/:id',
        {
            schema: updateClientJsonSchema,
            preHandler: [fastify.authenticate, fastify.authorize(['ADVISOR'])],
        },
        updateClient
    )
    fastify.delete(
        '/client/:id',
        {
            preHandler: [fastify.authenticate, fastify.authorize(['ADVISOR'])],
        },
        deleteClient
    ) }
