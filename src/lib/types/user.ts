import {z} from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  web3Address: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
})

export type SocietyType = z.infer<typeof UserSchema>
