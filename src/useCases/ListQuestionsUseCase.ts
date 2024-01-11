import { IQuestionsRepository } from "@/repositories/IQuestionsRepository";

export class ListQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute() {
    const questions = await this.questionsRepository.list()

    return questions;
  }
}