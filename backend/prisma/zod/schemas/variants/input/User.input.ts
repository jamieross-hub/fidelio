import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    authId: z.string(),
    createdAt: z.date(),
    email: z.string(),
    username: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    transactions: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
