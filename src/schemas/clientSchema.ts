import { z } from 'zod'

export const createClientSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    family_profile: z.string().optional(),
    age: z.number(),
})
export const createClientJsonSchema = {
    body: {
        type: 'object',
        required: ['email', 'age'],
        properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            status: { type: 'boolean' },
            family_profile: { type: 'string' },
            age: { type: 'number' },
        }
    }
}
export const updateClientSchema = z.object({
    body: z.object({
        email: z.string().email().optional(),
        name: z.string().optional(),
        status: z.boolean().optional(),
        family_profile: z.string().optional(),
        age: z.number().optional(),
    }),
    params: z.object({
        id: z.string().uuid(),
    }),
})

export const updateClientJsonSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' }
        }
    },
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            status: { type: 'boolean' },
            family_profile: { type: 'string' },
            age: { type: 'number' }
        }
    }
}



export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
})
