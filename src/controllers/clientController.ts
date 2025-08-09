import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../plugins/prisma'
import { createClientSchema } from '../schemas/clientSchema'
import bcrypt from 'bcrypt'

export async function createClient(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, password, role } = createClientSchema.parse(request)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await request.server.prisma.clients.create({
        data: {
            email,
            name
        },
    })

    return reply.status(201).send(user)
}
