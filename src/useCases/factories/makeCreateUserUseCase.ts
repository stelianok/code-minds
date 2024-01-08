import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { CreateUserUseCase } from "../CreateUserUseCase";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}