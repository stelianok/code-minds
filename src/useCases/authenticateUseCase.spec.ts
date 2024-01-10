import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { describe, beforeEach, it, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticateUseCase";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const unhashedPassword = "123456"

    await usersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: await hash(unhashedPassword, 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })

})