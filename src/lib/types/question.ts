import {z} from "zod";

export const QuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  questionOptions: z.array(z.string()),
  rightOption: z.string(),
  courseId: z.string(),
  societyId: z.string(),
  moduleId: z.string(),
})

export type QuestionType = z.infer<typeof QuestionSchema>
