import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'

export default fp(async (fastify) => {
    fastify.register(swagger, {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'API Docs',
                description: 'API description',
                version: '1.0.0',
            },
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true,
    })
})
