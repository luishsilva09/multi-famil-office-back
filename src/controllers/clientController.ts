import { FastifyRequest, FastifyReply } from 'fastify'
import { createClientSchema, updateClientSchema } from '../schemas/clientSchema'
import { ZodError } from 'zod'

export async function createClient(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = createClientSchema.parse(request.body)
        const { email, name, family_profile, age } = data

        const uniqueEmail = await request.prisma.clients.findUnique({
            where:{
                email: email
            }
        })
        if (uniqueEmail) {
            return reply.status(409).send({ error: 'Email já cadastrado' })
        }
        const user = await request.prisma.clients.create({
            data: {
                email,
                age,
                name: name ?? '',
                family_profile: family_profile ?? ''
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

export async function listClient(request: FastifyRequest, reply: FastifyReply) {
    try {
        const clients = await request.prisma.clients.findMany({})

        return reply.status(200).send(clients)
    } catch (error) {
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}

export async function listClientById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string }
        const client = await request.prisma.clients.findUnique({
            where:{
                id
            }
        })

        return reply.status(200).send(client)
    } catch (error) {
        return reply.status(500).send({ error: (error as any).errors ?? 'Internal server error' })
    }
}

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = updateClientSchema.parse({
            body: request.body,
            params: request.params,
        })
        const { id } = data.params
        const updateData = data.body

        // Verifica se o client existe
        const client = await request.prisma.clients.findUnique({ where: { id } })
        if (!client) {
            return reply.status(404).send({ error: 'Client not found' })
        }

        // Se o email estiver sendo atualizado, verificar duplicidade
        if (updateData.email && updateData.email !== client.email) {
            const existing = await request.prisma.clients.findUnique({
                where: { email: updateData.email }
            })
            if (existing) {
                return reply.status(409).send({ error: 'Email já cadastrado' })
            }
        }

        // Atualiza o client
        const updatedClient = await request.prisma.clients.update({
            where: { id },
            data: updateData
        })

        return reply.status(200).send(updatedClient)
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ error: 'Validation failed', issues: error.errors })
        }
        console.error(error)
        return reply.status(500).send({ error: (error as any).message ?? 'Internal server error' })
    }
}

export async function deleteClient(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string }

        // Verifica se o client existe
        const client = await request.prisma.clients.findUnique({ where: { id } })
        if (!client) {
            return reply.status(404).send({ error: 'Client not found' })
        }

        await request.prisma.clients.delete({ where: { id } })

        return reply.status(204).send()
    } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: (error as any).message ?? 'Internal server error' })
    }
}