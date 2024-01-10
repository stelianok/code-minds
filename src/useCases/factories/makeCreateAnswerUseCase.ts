import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { CreateAnswerUseCase } from "../CreateAnswerUseCase";
import { PrismaAnswersRepository } from "@/repositories/prisma/PrismaAnswersRepository";
import { PrismaQuestionsRepository } from "@/repositories/prisma/PrismaQuestionsRepository";

export function makeCreateAnswerUseCase() {
  const answerRepository = new PrismaAnswersRepository();
  const questionsRepository = new PrismaQuestionsRepository();
  const usersRepository = new PrismaUsersRepository();

  const useCase = new CreateAnswerUseCase(
    answerRepository,
    questionsRepository,
    usersRepository
  );

  return useCase;
}