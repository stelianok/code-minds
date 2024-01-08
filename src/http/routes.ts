import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/CreateUser';

export async function AppRoutes(app: FastifyInstance) {
  app.get("/", (request, reply) => {
    reply.send(200)
  })

  app.post('/users', createUser)
}