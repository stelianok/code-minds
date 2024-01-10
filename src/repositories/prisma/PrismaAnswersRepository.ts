import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { IAnswersRepository } from "../IAnswersRepository";

export class PrismaAnswersRepository implements IAnswersRepository {
  async create(data: Prisma.AnswerCreateInput) {
    const answer = await prisma.answer.create({ data });

    return answer;
  }

}