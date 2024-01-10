import { Prisma, Question } from "@prisma/client";
import { IQuestionsRepository } from "../IQuestionsRepository";
import { randomUUID } from "crypto";

export class InMemoryQuestionRepository implements IQuestionsRepository {
  public questions: Question[] = [];

  async create(data: Prisma.QuestionCreateInput) {
    const question = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      author_id: 'user-01',
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
}