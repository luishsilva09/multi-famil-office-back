import { z } from 'zod'

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['ADVISOR', 'VIEWER']).optional()
})

export const createUserJsonSchema = {
    body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            password: { type: 'string', minLength: 6 },
            role: { type: 'string', enum: ['ADVISOR', 'VIEWER'] },
        },
    },
}

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const loginUserJsonSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        },
    },
}
