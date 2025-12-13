import * as z from 'zod';
export const UserFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  authId: z.string(),
  createdAt: z.date(),
  email: z.string(),
  username: z.string().optional(),
  image: z.string().optional(),
  transactions: z.array(z.unknown())
}));