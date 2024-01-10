import { Prisma, Question } from "@prisma/client";
import { IQuestionsRepository } from "../IQuestionsRepository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";

export class InMemoryQuestionRepository implements IQuestionsRepository {
  public questions: Question[] = [];

  async create(data: Prisma.QuestionCreateInput) {

    if (!data.author.create?.id) {
      throw new ResourceNotFoundError()
    }

    const question: Question = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      author_id: data.author.create.id,
      score: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.questions.push(question);

    return question;
  }

  async findByTitle(title: string) {
    const question = this.questions.find((question) => question.title === title)

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(id: string) {
    const question = this.questions.find((question) => question.id === id)

    if (!question) {
      return null
    }

    return question
  }
}