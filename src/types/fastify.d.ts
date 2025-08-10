import '@fastify/jwt'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }

    interface FastifyRequest {
        prisma: PrismaClient
        jwt: import('@fastify/jwt').FastifyJWT
        jwtVerify(): Promise<void>
    }

    interface FastifyReply {
        prisma: PrismaClient
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        sub: string
        role: 'ADVISOR' | 'VIEWER'
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: any, reply: any) => Promise<void>
        authorize: (roles: string[]) => (request: any, reply: any) => Promise<void>
    }
}