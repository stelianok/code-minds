import { Prisma, Question } from "@prisma/client";
import { IQuestionsRepository } from "../IQuestionsRepository";

export class InMemoryQuestionRepository implements IQuestionsRepository {
  public questions: Question[] = [];

  async create(data: Prisma.QuestionCreateInput) {
    const question: Question = {
      id: 'question-01',
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