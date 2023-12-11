import { z } from 'zod';
import { SocietySchema } from './society';

export const UserSchema = z.object({
	web3Address: z.string(),
	nonce: z.string(),
	chainId: z.number(),
	societies: z.record(z.string(), SocietySchema).optional()
});

export const AuthUserSchema = UserSchema.omit({ societies: true });

export type UserType = z.infer<typeof UserSchema>;
export type AuthUserType = z.infer<typeof AuthUserSchema>;
