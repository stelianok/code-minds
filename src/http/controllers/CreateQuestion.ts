import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFoundError";
import { makeCreateQuestionUseCase } from "@/useCases/factories/makeCreateQuestionUseCase";
import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { z } from "zod";

interface ICreateQuestionRequest {
  title: string;
  description: string;
  author_id: string;
}

export async function CreateQuestion(
  request: FastifyRequest<{ Body: ICreateQuestionRequest } | RequestGenericInterface>,
  reply: FastifyReply
) {

  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    author_id: z.string().uuid()
  })

  const { title, description, author_id } = registerBodySchema.parse(request.body);

  try {
    const createQuestionUseCase = makeCreateQuestionUseCase()

    await createQuestionUseCase.execute({
      title,
      description,
      author_id
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