import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    authId: z.string(),
    createdAt: z.date(),
    email: z.string(),
    username: z.string().nullable(),
    image: z.string().nullable(),
    transactions: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
