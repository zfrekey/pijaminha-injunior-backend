import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from './http/lib/prisma'
import { z } from 'zod'

export async function updatePajama(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    sizes: z.array(z.object({
      id: z.string().uuid(),
      stock_quantity: z.number(),
    })),
  })

  const { id } = paramsSchema.parse(request.params)
  const { sizes } = bodySchema.parse(request.body)

  for (const size of sizes) {
    await prisma.pajamaSize.update({
      where: { id: size.id },
      data: { stock_quantity: size.stock_quantity },
    })
  }

  const updatedPajama = await prisma.pajama.findUnique({
    where: { id },
    include: { sizes: true },
  })

  return reply.status(200).send({ pajama: updatedPajama })
}