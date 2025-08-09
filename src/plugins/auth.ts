import fp from 'fastify-plugin'

export default fp(async (fastify) => {
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET || 'supersecret',
    })

    fastify.decorate('authenticate', async (request: any, reply: any) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    fastify.decorate('authorize', (roles: string[]) => {
        return async (request: any, reply: any) => {
            const user = request.user
            if (!user || !roles.includes(user.role)) {
                return reply.status(403).send({ message: 'Forbidden' })
            }
        }
    })
})
