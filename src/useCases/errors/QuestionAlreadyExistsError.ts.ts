export class QuestionAlreadyExistsError extends Error {
  constructor() {
    super("Question with the same name already exists")
  }
}