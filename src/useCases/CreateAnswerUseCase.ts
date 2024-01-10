import { IAnswersRepository } from "@/repositories/IAnswersRepository";
import { IQuestionsRepository } from "@/repositories/IQuestionsRepository";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { Answer } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface ICreateAnswerUseCaseRequest {
  description: string;
  author_id: string;
  question_id: string;
}

interface ICreateAnswerUseCaseResponse {
  answer: Answer
}

export class CreateAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private questionsRepository: IQuestionsRepository,
    private usersRepository: IUsersRepository
  ) { }

  async execute({ description, author_id, question_id }: ICreateAnswerUseCaseRequest): Promise<ICreateAnswerUseCaseResponse> {

    const user = await this.usersRepository.findById(author_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      throw new ResourceNotFoundError()
    }

    const answer = await this.answersRepository.create({
      description,
      question: { create: question },
      author: { create: user }
    })

    return { answer };
  }
}