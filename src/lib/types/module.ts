import { z } from "zod";
import { QuestionSchema } from "$lib/types/question";

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
});

export type ModuleType = z.infer<typeof ModuleSchema>;
export type NewModuleType = Omit<ModuleType, "id">;
export type UpdateModuleType = Partial<NewModuleType> & {
	id: string;
};
