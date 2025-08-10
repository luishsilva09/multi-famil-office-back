import { FastifyInstance } from 'fastify'
import { createEvent, deleteEvent, listEvent, updateEvent } from '../controllers/eventController'
import { createEventJsonSchema, updateEventJsonSchema } from '../schemas/eventSchema'

export async function eventRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/event',
        {
            schema: createEventJsonSchema,
            preHandler: [fastify.authenticate],
        },
        createEvent
    )

    fastify.get(
        '/event',
        {
            preHandler: [fastify.authenticate],
        },
        listEvent
    )

    fastify.put(
        '/event/:id',
        {
            schema: updateEventJsonSchema,
            preHandler: [fastify.authenticate],
        },
        updateEvent
    )

    fastify.delete(
        '/event/:id',
        {
            preHandler: [fastify.authenticate],
        },
        deleteEvent
    )
}

