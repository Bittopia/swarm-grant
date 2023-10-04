import {z} from "zod";

export const CourseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  societyId: z.string(),
})

export type CourseType = z.infer<typeof CourseSchema>
