import { Prisma, Question } from "@prisma/client";

export interface IQuestionsRepository {
  create(data: Prisma.QuestionCreateInput): Promise<Question>
  findByTitle(title: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
}