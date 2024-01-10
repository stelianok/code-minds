import { InMemoryQuestionRepository } from "@/repositories/inMemory/InMemoryQuestionRepository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository"
import { describe, beforeEach, it, expect } from "vitest"
import { CreateQuestionUseCase } from "./CreateQuestionUseCase"
import { QuestionAlreadyExistsError } from "./errors/QuestionAlreadyExistsError.ts"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"

let questionsRepository: InMemoryQuestionRepository
let usersRepository: InMemoryUsersRepository
let createQuestionUseCase: CreateQuestionUseCase

describe("Create question use case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionRepository()
    usersRepository = new InMemoryUsersRepository()
    createQuestionUseCase = new CreateQuestionUseCase(questionsRepository, usersRepository)
  })

  it("should be able to create a new question", async () => {
    const user01 = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    const { question } = await createQuestionUseCase.execute({
      title: 'question-title',
      description: "description",
      author_id: user01.id
    })

    expect(question.id).toEqual(expect.any(String))
  })

  it("should not be able to create a question with the same name", async () => {
    const sameQuestionTitle = "question-title"

    const user01 = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    await createQuestionUseCase.execute({
      title: sameQuestionTitle,
      description: "description",
      author_id: user01.id
    })

    await expect(() =>
      createQuestionUseCase.execute({
        title: sameQuestionTitle,
        description: "description",
        author_id: user01.id
      })
    ).rejects.toBeInstanceOf(QuestionAlreadyExistsError)
  })

  it("should not be able to create a question for a non existent user", async () => {
    await expect(() =>
      createQuestionUseCase.execute({
        title: 'question-title',
        description: "description",
        author_id: "non-existent-user-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})