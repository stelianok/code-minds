import { Answer, Prisma } from "@prisma/client";
import { IAnswersRepository } from "../IAnswersRepository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";

export class InMemoryAnswersRepository implements IAnswersRepository {
  private answers: Answer[] = []

  async create(data: Prisma.AnswerCreateInput) {
    const authorId = data.author.create?.id;
    const questionId = data.question.create?.id;

    if (!authorId) {
      throw new ResourceNotFoundError()
    }
    if (!questionId) {
      throw new ResourceNotFoundError()
    }

    const answer: Answer = {
      id: data.id ?? randomUUID(),
      description: data.description,
      author_id: authorId,
      question_id: questionId,
      score: 0,
      created_at: new Date(),
      updated_at: new Date(),

    }

    this.answers.push(answer);

    return answer;
  }
}