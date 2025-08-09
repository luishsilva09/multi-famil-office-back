import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }

    interface FastifyRequest {
        prisma: PrismaClient
    }

    interface FastifyReply {
        prisma: PrismaClient
    }
}
