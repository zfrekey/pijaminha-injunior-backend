import { FastifyInstance } from 'fastify'
import { createPajama } from './create'
import { updatePajama } from './update'
import { deletePajama } from './delete'
import { getPajama } from './get'

export async function pajamaRoutes(app: FastifyInstance) {
  app.post('/pajamas', createPajama)
  app.put('/pajamas/:id', updatePajama)
  app.delete('/pajamas/:id', deletePajama)
  app.get('/pajamas/:id', getPajama)
  app.get('/pajamas', getAllPajamas) 
}