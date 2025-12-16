import * as z from 'zod';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    authId: z.string(),
    createdAt: z.date(),
    email: z.string(),
    username: z.string().nullable(),
    image: z.string().nullable(),
    isGuest: z.boolean(),
    transactions: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
