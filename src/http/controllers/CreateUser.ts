import { UserAlreadyExistsError } from "@/useCases/errors/UserAlreadyExistsError";
import { makeCreateUserUseCase } from "@/useCases/factories/makeCreateUserUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface ICreateUserRequest {
  name: string;
  title?: string;
  email: string;
  password: string;
}

export async function createUser(request: FastifyRequest<{ Body: ICreateUserRequest }>, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    title: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, title, email, password } = registerBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({
      name,
      title,
      email,
      password
    });

    console.log(user.id);
  }
  catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()


}