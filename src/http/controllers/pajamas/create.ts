import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from './http/lib/prisma'
import { z } from 'zod'

export async function createPajama(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    season: z.string(),
    type: z.string(),
    gender: z.string(),
    favorite: z.boolean(),
    on_sale: z.boolean(),
    sale_percent: z.number().optional(),
    sizes: z.array(z.object({
      size: z.string(),
      stock_quantity: z.number(),
    })),
  })

  const { name, description, image, price, season, type, gender, favorite, on_sale, sale_percent, sizes } = bodySchema.parse(request.body)

  const pajama = await prisma.pajama.create({
    data: {
      name,
      description,
      image,
      price,
      season,
      type,
      gender,
      favorite,
      on_sale,
      sale_percent,
      sizes: {
        create: sizes.map(size => ({
          size: size.size,
          stock_quantity: size.stock_quantity,
        })),
      },
    },
    include: {
      sizes: true,
    },
  })

  return reply.status(201).send({ pajama })
}