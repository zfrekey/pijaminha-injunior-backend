import { FastifyInstance } from 'fastify'
import { create } from './create'
//import { updatePajama } from './update'
//import { deletePajama } from './delete'
//import { getPajama } from './get'

export async function pajamaRoutes(app: FastifyInstance) {
  app.post('/pajamas', create)
  //app.put('/pajamas/:id', update)
  //app.delete('/pajamas/:id', deletePajama)
  //app.get('/pajamas/:id', getPajama)
  //app.get('/pajamas', listPajamas) 
}