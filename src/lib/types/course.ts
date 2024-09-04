import { z } from "zod";
import { ModuleSchema } from "$lib/types/module";

export const CourseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	startDate: z.string(),
	societyId: z.string(),
	modules: z.record(z.string(), ModuleSchema).optional(),
	educator: z.string(),
	members: z.array(z.string()).optional(),
	image: z.string().optional(),
});

export type CourseType = z.infer<typeof CourseSchema>;
export type NewCourseType = Omit<CourseType, "id" | "modules" | "members"> & {
	imageFile?: File;
};
export type UpdateCourseType = Partial<NewCourseType> & {
	id: string;
	members?: string[];
};
