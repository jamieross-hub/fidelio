import * as z from 'zod';
export const UserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  authId: z.string(),
  createdAt: z.date(),
  email: z.string(),
  username: z.string().optional(),
  image: z.string().optional(),
  isGuest: z.boolean(),
  transactions: z.array(z.unknown())
}));