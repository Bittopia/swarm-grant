import { z } from 'zod';
import { CourseSchema } from '$lib/types/course';

export const SocietySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	courses: z.record(z.string(), CourseSchema).optional(),
	creator: z.string(),
	members: z.array(z.string()).optional()
});

export type SocietyType = z.infer<typeof SocietySchema>;
export type NewSocietyType = Omit<SocietyType, 'id' | 'courses' | 'members'>;
