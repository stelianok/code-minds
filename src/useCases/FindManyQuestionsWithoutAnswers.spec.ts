import { InMemoryQuestionRepository } from "@/repositories/inMemory/InMemoryQuestionRepository";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { FindManyQuestionsWithoutAnswers } from "./FindManyQuestionsWithoutAnswersUseCase";

let usersRepository: InMemoryUsersRepository
let questionsRepository: InMemoryQuestionRepository
let findManyQuestionsWithoutAnswerUseCase: FindManyQuestionsWithoutAnswers

describe("List questions use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    questionsRepository = new InMemoryQuestionRepository()
    findManyQuestionsWithoutAnswerUseCase = new FindManyQuestionsWithoutAnswers(questionsRepository)
  })

  it("should be able to list questions without an answer", async () => {
    const user = await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@xample.com",
      password: "123123"
    })

    await questionsRepository.create({
      id: "question-01",
      title: 'question-with-answer',
      description: "description",
      author: {
        connect: user
      },
      answers: {
        connect: [{
          id: "answer-01",
          description: "description",
          author_id: user.id,
          question_id: "question-01",
          score: 0,
          created_at: new Date(),
          updated_at: new Date(),
        }]
      }
    })

    await questionsRepository.create({
      id: "question-02",
      title: 'question-with-two-answers',
      description: "description",
      author: {
        connect: user
      },
      answers: {
        connect: [
          {
            id: "answer-01",
            description: "description",
            author_id: user.id,
            question_id: "question-02",
            score: 0,
            created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id: "answer-02",
            description: "description",
            author_id: user.id,
            question_id: "question-02",
            score: 0,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ]
      }
    })

    const questionWithoutAnswers = await questionsRepository.create({
      title: 'question-without-answers',
      description: "description",
      author: {
        connect: user
      },
    })

    const questions = await findManyQuestionsWithoutAnswerUseCase.execute();

    expect(questions).toHaveLength(1)
    expect(questions).toContain(questionWithoutAnswers)
  })
})