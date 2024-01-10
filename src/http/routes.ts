import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/CreateUser';
import { CreateQuestion } from './controllers/CreateQuestion';
import { CreateAnswer } from './controllers/CreateAnswer';
import { authenticate } from './controllers/authenticate';
import { verifyJWT } from './middlewares/verify-jwt';

export async function AppRoutes(app: FastifyInstance) {
  app.get("/", (request, reply) => {
    reply.send(200)
  })

  app.post('/users', createUser)
  app.post('/sessions', authenticate)

  app.post('/questions', { onRequest: [verifyJWT] }, CreateQuestion)
  app.post('/answers', { onRequest: [verifyJWT] }, CreateAnswer)
}