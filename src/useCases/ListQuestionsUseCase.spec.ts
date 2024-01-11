import { InMemoryQuestionRepository } from "@/repositories/inMemory/InMemoryQuestionRepository";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { ListQuestionsUseCase } from "./ListQuestionsUseCase";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";

let usersRepository: InMemoryUsersRepository
let questionsRepository: InMemoryQuestionRepository
let listQuestionsUseCase: ListQuestionsUseCase

describe("List questions use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    questionsRepository = new InMemoryQuestionRepository()
    listQuestionsUseCase = new ListQuestionsUseCase(questionsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to list questions", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    await questionsRepository.create({
      title: 'question-title-01',
      description: "description",
      author: {
        connect: user
      }
    })

    await questionsRepository.create({
      title: 'question-title-02',
      description: "description",
      author: {
        connect: user
      }
    })

    await questionsRepository.create({
      title: 'question-title-03',
      description: "description",
      author: {
        connect: user
      }
    })

    const questions = await listQuestionsUseCase.execute();

    expect(questions).toHaveLength(3)

  })

  it("should be able to list questions by most recent date", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const oldestQuestion = await questionsRepository.create({
      title: 'oldest-question',
      description: "description",
      author: {
        connect: user
      }
    })

    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    const mostRecentQuestion = await questionsRepository.create({
      title: 'most-recent-question',
      description: "description",
      author: {
        connect: user
      }
    })

    vi.setSystemTime(new Date(2024, 0, 0, 7, 0, 0))

    const middleQuestion = await questionsRepository.create({
      title: 'middle-question',
      description: "description",
      author: {
        connect: user
      }
    })

    const questions = await listQuestionsUseCase.execute();

    expect(questions[0]).toEqual(mostRecentQuestion)
    expect(questions[1]).toEqual(middleQuestion)
    expect(questions[2]).toEqual(oldestQuestion)
  })
})