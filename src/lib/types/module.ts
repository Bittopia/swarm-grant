import {z} from "zod";

export const ModuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  content: z.string()
})

export type ModuleType = z.infer<typeof ModuleSchema>
