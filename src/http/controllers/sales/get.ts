import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { GetSaleUseCase } from "@/use-cases/get-sale-by-id-use-case"
import { PrismaSalesRepository } from "@/repositories/prisma/prismaSalesRepository"

export async function get(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        id : z.string().uuid(),
    })

    const {id} = getBodySchema.parse(request.params)

    try {
        const prismaSaleRepository = new PrismaSalesRepository()
        const getSaleUseCase = new GetSaleUseCase(prismaSaleRepository)
        const sale = await getSaleUseCase.execute({
            id
        })

        return reply.status(200).send({ sale })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send(err.message)
        }
    
    }

}