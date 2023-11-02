import {z} from "zod";
import {QuestionSchema} from "$lib/types/question";

export const ModuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  courseId: z.string(),
  societyId: z.string(),
  questions: z.record(z.string(), QuestionSchema).optional()
})

export type ModuleType = z.infer<typeof ModuleSchema>
