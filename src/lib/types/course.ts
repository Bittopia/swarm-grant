import {z} from "zod";
import {ModuleSchema} from "$lib/types/module";

export const CourseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  societyId: z.string().optional(),
  modules: z.record(z.string(), ModuleSchema).optional()
})

export type CourseType = z.infer<typeof CourseSchema>
