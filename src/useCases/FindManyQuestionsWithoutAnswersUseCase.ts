import { IQuestionsRepository } from "@/repositories/IQuestionsRepository";

export class FindManyQuestionsWithoutAnswers {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute() {
    const questions = await this.questionsRepository.findManyQuestionsWithoutAnswer()

    return questions;
  }
}