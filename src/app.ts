import fastify from "fastify";

export const app = fastify()

app.get("/", (request, reply) => {
  reply.send(200)
})
