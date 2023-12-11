import { z } from 'zod';
import { UserSchema } from './user';
import { SocietySchema } from './society';

export const DataSchema = z.object({
	users: z.record(UserSchema),
	societies: z.record(SocietySchema)
});

export type DataType = z.infer<typeof DataSchema>;
