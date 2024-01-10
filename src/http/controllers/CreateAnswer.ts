import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";
import { makeCreateAnswerUseCase } from "@/useCases/factories/makeCreateAnswerUseCase";
import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { z } from "zod";

interface ICreateAnswerRequest {
  description: string;
  author_id: string;
  question_id: string;
}

export async function CreateAnswer(
  request: FastifyRequest<{ Body: ICreateAnswerRequest } | RequestGenericInterface>,
  reply: FastifyReply
) {

  const registerBodySchema = z.object({
    description: z.string(),
    author_id: z.string().uuid(),
    question_id: z.string().uuid()
  })

  const { description, author_id, question_id } = registerBodySchema.parse(request.body);

  try {
    const createAnswerUseCase = makeCreateAnswerUseCase()

    await createAnswerUseCase.execute({
      description,
      author_id,
      question_id
    });
  }
  catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(409).send({ message: err.message })
    }
    throw err;
  }

  return reply.status(201).send()
}