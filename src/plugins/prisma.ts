import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
    interface FastifyRequest {
        prisma: PrismaClient
    }
}

const prisma = new PrismaClient()

export default fp(async (fastify) => {
    fastify.decorate('prisma', prisma)

    fastify.addHook('onClose', async () => {
        await prisma.$disconnect()
    })

    fastify.addHook('onRequest', async (request) => {
        request.prisma = prisma
    })
})
