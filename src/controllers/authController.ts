import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { createUserSchema, loginUserSchema } from '../schemas/userSchema'
import bcrypt from 'bcrypt'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, email, password, role } = createUserSchema.parse(request.body)

        // Verifica se email já existe
        const existingUser = await request.prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return reply.status(409).send({ error: 'Email already registered' })
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10)

        // Cria usuário no banco
        const user = await request.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'VIEWER',
            },
        })

        // Responde sem a senha
        return reply.status(201).send({ id: user.id, email: user.email, name: user.name, role: user.role })
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ error: 'Validation failed', issues: (error as any).issues })
        }
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password } = loginUserSchema.parse(request.body)

        // Busca usuário pelo email
        const user = await request.prisma.user.findUnique({ where: { email } })

        if (!user) {
            return reply.status(401).send({ error: 'Invalid credentials' })
        }

        // Compara senha com hash
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return reply.status(401).send({ error: 'Invalid credentials' })
        }

        // Gera JWT com payload contendo id e role
        const token = await reply.jwtSign(
            { sub: user.id, role: user.role },
            { expiresIn: '1h' }
        )

        return reply.send({ token })
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ error: 'Validation failed', issues: (error as any).issues })
        }
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}
