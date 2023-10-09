import {z} from "zod";
import {CourseSchema} from "$lib/types/course";

export const SocietySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    courses: z.record(z.string(), CourseSchema).optional()
})

export type SocietyType = z.infer<typeof SocietySchema>
