import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { AuthenticateUseCase } from "../authenticateUseCase";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}