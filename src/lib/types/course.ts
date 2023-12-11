import { z } from 'zod';
import { ModuleSchema } from '$lib/types/module';

export const CourseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	societyId: z.string(),
	modules: z.record(z.string(), ModuleSchema).optional()
});

export type CourseType = z.infer<typeof CourseSchema>;
export type NewCourseType = Omit<CourseType, 'id'>;
