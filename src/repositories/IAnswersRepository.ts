import { Answer, Prisma } from "@prisma/client";

export interface IAnswersRepository {
  create(data: Prisma.AnswerCreateInput): Promise<Answer>
}