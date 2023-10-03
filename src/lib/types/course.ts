import {z} from "zod";

export const CourseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
})

export type SocietyType = z.infer<typeof CourseSchema>
