import { Prisma, Question } from "@prisma/client";

export type IQuestionWithAnswers = Prisma.QuestionGetPayload<{ include: { answers: true } }>

export interface IQuestionsRepository {
  list(): Promise<Question[]>
  create(data: Prisma.QuestionCreateInput): Promise<Question>
  findByTitle(title: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  findManyQuestionsWithoutAnswer(): Promise<IQuestionWithAnswers[] | null>
}