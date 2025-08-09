import Fastify from 'fastify'
import dotenv from 'dotenv'
import prismaPlugin from './plugins/prisma'
import authPlugin from './plugins/auth'
import swaggerPlugin from './plugins/swagger'
import { userRoutes } from './routes/clientRoutes'

dotenv.config()

const app = Fastify({ logger: true })

app.register(prismaPlugin)
app.register(authPlugin)
app.register(swaggerPlugin)
app.register(userRoutes)

const start = async () => {
    try {
        await app.listen({ port: 3000 })
        console.log('Server running at http://localhost:3000')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
