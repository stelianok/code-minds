import { Answer, Prisma, Question } from "@prisma/client";
import { IQuestionWithAnswers, IQuestionsRepository } from "../IQuestionsRepository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";


export class InMemoryQuestionRepository implements IQuestionsRepository {
  public questions: IQuestionWithAnswers[] = [];


  async list() {
    const sortedQuestionsByDate = this.questions.sort((a, b) => {
      return ((b.created_at.getTime() - a.created_at.getTime()))
    });

    return sortedQuestionsByDate
  }



  async create(data: Prisma.QuestionCreateInput) {
    let answers = data.answers?.connect;
    let a: any = [];

    if (!data.author.connect?.id) {
      throw new ResourceNotFoundError()
    }

    if (!answers) {
      answers = []
    }

    if (Array.isArray(answers)) {
      a = answers.map((answer) => {
        answer.score = 0
        answer.created_at = new Date()
        answer.updated_at = new Date()

        return answer;
      })
    }
    else {
      answers.score = 0
      answers.created_at = new Date()
      answers.updated_at = new Date()
    }

    const question: IQuestionWithAnswers = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      author_id: data.author.connect.id,
      score: 0,
      created_at: new Date(),
      updated_at: new Date(),
      answers: a,
    }


    this.questions.push(question);

    return question;
  }

  async findByTitle(title: string) {
    const question = this.questions.find((question) => question.title === title)

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(id: string) {
    const question = this.questions.find((question) => question.id === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyQuestionsWithoutAnswer() {
    const questionsWithoutAnswer = this.questions.filter((question) => {
      if (question.answers.length == 0) {
        return question;
      }
    })

    if (!questionsWithoutAnswer) {
      return null;
    }

    console.log(questionsWithoutAnswer);

    return questionsWithoutAnswer
  }
}