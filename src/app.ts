import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import fastify, { FastifyRequest } from "fastify";
import { prisma } from "./lib/prisma";

export const app = fastify()

app.get("/", (request, reply) => {
  reply.send(200)
})

interface IUserRequest {
  name: string;
  title?: string;
  email: string;
  password: string;
}

app.post("/users", async (request: FastifyRequest<{ Body: IUserRequest }>, reply) => {
  const { name, title, email, password } = request.body;

  const user: User = {
    id: randomUUID(),
    name,
    title: (title ? title : null),
    email,
    password,
    created_at: new Date()
  }

  try {
    await prisma.user.create({ data: user })
  }
  catch (err) {
    reply.code(400).send()
    throw new Error()
  }

  return reply.code(201).send()
})

