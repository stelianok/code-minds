import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create new user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await createUserUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      createUserUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

})