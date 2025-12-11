import * as z from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    authId: z.number(),
    createdAt: z.number(),
    email: z.number(),
    username: z.number(),
    image: z.number(),
    transactions: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    authId: z.string().nullable(),
    createdAt: z.date().nullable(),
    email: z.string().nullable(),
    username: z.string().nullable(),
    image: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    authId: z.string().nullable(),
    createdAt: z.date().nullable(),
    email: z.string().nullable(),
    username: z.string().nullable(),
    image: z.string().nullable()
  }).nullable().optional()});