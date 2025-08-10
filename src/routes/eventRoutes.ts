import { FastifyInstance } from 'fastify'
import { createEvent, deleteEvent, listEvent, updateEvent } from '../controllers/eventController'
import { createEventJsonSchema, updateEventJsonSchema } from '../schemas/eventSchema'

export async function eventRoutes(fastify: FastifyInstance) {
    fastify.post('/event', { schema: createEventJsonSchema }, createEvent)
    fastify.get('/event', listEvent)
    fastify.put('/event/:id', { schema: updateEventJsonSchema }, updateEvent)
    fastify.delete('/event/:id', deleteEvent)
}
