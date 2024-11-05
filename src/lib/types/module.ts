import { z } from "zod";
import { QuestionSchema } from "$lib/types/question";

export const ModuleVideoSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	description: z.string(),
	thumbnail: z.string(),
});

export const ModuleSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	content: z.string(),
	courseId: z.string(),
	societyId: z.string(),
	questions: z.record(z.string(), QuestionSchema).optional(),
	image: z.string().optional(),
	creator: z.string(),
	videos: z.array(ModuleVideoSchema).optional(),
});

export type ModuleType = z.infer<typeof ModuleSchema>;
export type NewModuleType = Omit<ModuleType, "id"> & {
	videos?: string;
};
export type UpdateModuleType = Partial<NewModuleType> & {
	id: string;
	videos?: string;
};

export type ModuleVideoType = z.infer<typeof ModuleVideoSchema>;
