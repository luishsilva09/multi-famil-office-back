import { z } from 'zod'

export const createEventSchema = z.object({
    type: z.string(),
    value: z.number(),
    frequency: z.enum(['ONCE', 'MONTHLY', 'YEARLY'])
})
export const createEventJsonSchema = {
    body: {
        type: 'object',
        required: ['type', 'value', 'frequency'],
        properties: {
            type: { type: 'string' },
            value: { type: 'number' },
            frequency: {
                type: 'string',
                enum: ['ONCE', 'MONTHLY', 'YEARLY']
            }
        }
    }
}
export const updateEventSchema = z.object({
    body: z.object({
        type: z.string(),
        value: z.number(),
        frequency: z.enum(['ONCE', 'MONTHLY', 'YEARLY'])
    }),
    params: z.object({
        id: z.string().uuid(),
    }),
})

export const updateEventJsonSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' }
        }
    },
    body: {
        type: 'object',
        required: ['type', 'value', 'frequency'],
        properties: {
            type: { type: 'string' },
            value: { type: 'number' },
            frequency: {
                type: 'string',
                enum: ['ONCE', 'MONTHLY', 'YEARLY']
            }
        }
    }
}



export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
})
