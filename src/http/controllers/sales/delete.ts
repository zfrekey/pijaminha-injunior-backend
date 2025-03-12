import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaSalesRepository } from "@/repositories/prisma/prismaSalesRepository"
import { DeleteSaleUseCase } from "@/use-cases/delete-sale-use-case"
import { PrismaAddressRepository } from "@/repositories/prisma/prismaAddressRepository"

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        id : z.string().uuid(),
    })

    const {id} = getBodySchema.parse(request.params)

    try {
        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()
        const deleteSaleUseCase = new DeleteSaleUseCase(prismaSalesRepository, prismaAddressRepository)
       
        const sale = await deleteSaleUseCase.execute({
            id
        })

        return reply.status(200).send({ sale })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send(err.message)
        }
    
    }

}