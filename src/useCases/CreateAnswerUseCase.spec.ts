import { InMemoryQuestionRepository } from "@/repositories/inMemory/InMemoryQuestionRepository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository"
import { describe, beforeEach, it, expect } from "vitest"
import { InMemoryAnswersRepository } from "@/repositories/inMemory/InMemoryAnswersRepository"
import { CreateAnswerUseCase } from "./CreateAnswerUseCase"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"

let answersRepository: InMemoryAnswersRepository
let questionsRepository: InMemoryQuestionRepository
let usersRepository: InMemoryUsersRepository
let createAnswerUseCase: CreateAnswerUseCase

describe("Create answer use case", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    questionsRepository = new InMemoryQuestionRepository()
    usersRepository = new InMemoryUsersRepository()
    createAnswerUseCase = new CreateAnswerUseCase(answersRepository, questionsRepository, usersRepository)
  })

  it("user should be able to answer it's own question", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    const question = await questionsRepository.create({
      title: 'question-title',
      description: "description",
      author: {
        connect: user
      }
    })

    const { answer } = await createAnswerUseCase.execute({
      description: "answer description",
      author_id: user.id,
      question_id: question.id
    })

    expect(answer.id).toEqual(expect.any(String))
  })

  it("any user should be able to answer a question", async () => {
    const questionUser = await usersRepository.create({
      id: "user-01",
      name: "John Quest",
      email: "johnquest@xample.com",
      password: "123123"
    })

    const answerUser = await usersRepository.create({
      id: "user-02",
      name: "John Answer",
      email: "johnanswer@xample.com",
      password: "123123"
    })

    const question = await questionsRepository.create({
      title: 'question-title',
      description: "description",
      author: {
        connect: questionUser
      }
    })

    const { answer } = await createAnswerUseCase.execute({
      description: "answer description",
      author_id: answerUser.id,
      question_id: question.id
    })

    expect(answer.id).toEqual(expect.any(String))
  })

  it("should not be able to answer a question that doesn't exist", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    await expect(() =>
      createAnswerUseCase.execute({
        description: "answer description",
        author_id: user.id,
        question_id: 'invalid-question-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should not be able to answer a question if the user answering doesn't exist", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    const question = await questionsRepository.create({
      title: 'question-title',
      description: "description",
      author: {
        connect: user
      }
    })

    await expect(() =>
      createAnswerUseCase.execute({
        description: "answer description",
        author_id: 'invalid-user-id',
        question_id: question.id
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})