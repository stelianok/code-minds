import { Prisma, Question } from "@prisma/client";
import { IQuestionsRepository } from "../IQuestionsRepository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";

export class InMemoryQuestionRepository implements IQuestionsRepository {
  public questions: Question[] = [];


  async list() {
    const sortedQuestionsByDate = this.questions.sort((a, b) => {
      return ((b.created_at.getTime() - a.created_at.getTime()))
    });

    console.log(sortedQuestionsByDate)

    return sortedQuestionsByDate
  }



  async create(data: Prisma.QuestionCreateInput) {

    if (!data.author.connect?.id) {
      throw new ResourceNotFoundError()
    }

    const question: Question = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      author_id: data.author.connect.id,
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