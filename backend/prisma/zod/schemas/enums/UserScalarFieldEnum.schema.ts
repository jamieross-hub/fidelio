import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'authId', 'createdAt', 'email', 'username', 'image', 'isGuest'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;