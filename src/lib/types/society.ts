import {z} from "zod";

export const SocietySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
})

export type SocietyType = z.infer<typeof SocietySchema>
