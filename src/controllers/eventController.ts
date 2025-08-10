import { FastifyRequest, FastifyReply } from 'fastify'
import { createEventSchema, updateEventSchema } from '../schemas/eventSchema'
import { ZodError } from 'zod'

export async function createEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = createEventSchema.parse(request.body)
        const { type, value, frequency } = data

        if (!frequency) {
            return reply.status(400).send({ error: 'Frequency is required' })
        }

        const user = await request.prisma.events.create({
            data: {
                type,
                value,
                frequency
            },
        })

        return reply.status(201).send(user)
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ error: 'Validation failed', issues: (error as any).issues })
        }
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}

export async function listEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const events = await request.prisma.events.findMany({})

        return reply.status(200).send(events)
    } catch (error) {
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}

export async function updateEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = updateEventSchema.parse({
            body: request.body,
            params: request.params,
        })
        const { id } = data.params
        const updateData = data.body

        const event = await request.prisma.events.findUnique({ where: { id } })
        if (!event) {
            return reply.status(404).send({ error: 'Event not found' })
        }
        const updatedEvent = await request.prisma.events.update({
            where: { id },
            data: updateData
        })

        return reply.status(200).send(updatedEvent)
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ error: 'Validation failed', issues: error.errors })
        }
        console.error(error)
        return reply.status(500).send({ error: (error as any).message ?? 'Internal server error' })
    }
}

export async function deleteEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string }

        const event = await request.prisma.events.findUnique({ where: { id } })
        if (!event) {
            return reply.status(404).send({ error: 'Event not found' })
        }

        await request.prisma.events.delete({ where: { id } })

        return reply.status(204).send()
    } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: (error as any).message ?? 'Internal server error' })
    }
}