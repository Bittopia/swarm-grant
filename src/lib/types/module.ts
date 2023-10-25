import {z} from "zod";

export const ModuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  courseId: z.string().optional(),
  societyId: z.string().optional(),
})

export type ModuleType = z.infer<typeof ModuleSchema>
