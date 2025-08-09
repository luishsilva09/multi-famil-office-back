import { z } from 'zod'

export const createClientSchema = z.object({
    body: z.object({
        email: z.string().email(),
        name: z.string().optional(),
        password: z.string().min(6),
        role: z.enum(['ADVISOR', 'VIEWER']).optional(),
    }),
})

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
})
