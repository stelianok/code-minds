import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { CreateQuestionUseCase } from "../CreateQuestionUseCase";
import { PrismaQuestionsRepository } from "@/repositories/prisma/PrismaQuestionsRepository";

export function makeCreateQuestionUseCase() {
  const questionsRepository = new PrismaQuestionsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new CreateQuestionUseCase(questionsRepository, usersRepository);

  return useCase;
}