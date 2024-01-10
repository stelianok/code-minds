import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/CreateUser';
import { CreateQuestion } from './controllers/CreateQuestion';

export async function AppRoutes(app: FastifyInstance) {
  app.get("/", (request, reply) => {
    reply.send(200)
  })

  app.post('/users', createUser)
  app.post('/questions', CreateQuestion)

}