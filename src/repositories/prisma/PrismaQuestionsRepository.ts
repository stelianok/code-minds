import { Prisma } from "@prisma/client";
import { IQuestionsRepository } from "../IQuestionsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaQuestionsRepository implements IQuestionsRepository {
  async create(data: Prisma.QuestionCreateInput) {
    const question = await prisma.question.create({ data });

    return question;
  }
  async findByTitle(title: string) {
    const question = await prisma.question.findUnique({
      where: {
        title,
      }
    })

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(id: string) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      }
    })

    if (!question) {
      return null;
    }

    return question;
  }

}