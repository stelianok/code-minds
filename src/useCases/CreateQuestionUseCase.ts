import { IQuestionsRepository } from "@/repositories/IQuestionsRepository";
import { Question } from "@prisma/client";
import { QuestionAlreadyExistsError } from "./errors/QuestionAlreadyExistsError.ts.js";
import { IUsersRepository } from "@/repositories/IUsersRepository.js";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError.js";

interface IQuestionsUseCaseRequest {
  title: string;
  description: string;
  author_id: string;
}

interface IQuestionsUseCaseResponse {
  question: Question;
}
export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private usersRepository: IUsersRepository
  ) { }

  async execute({ title, description, author_id }: IQuestionsUseCaseRequest): Promise<IQuestionsUseCaseResponse> {
    /**
     * Questão só pode ser cadastrada por um usuário existente
     * Questões não podem ser cadastradas com o mesmo nome
     */
    const questionAlreadyExists = await this.questionsRepository.findByTitle(title)

    if (questionAlreadyExists) {
      throw new QuestionAlreadyExistsError();
    }

    const user = await this.usersRepository.findById(author_id)

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const question = await this.questionsRepository.create({
      title: title,
      description,
      score: 0,
      author: {
        create: user,
      }
    })

    return { question };
  }
}