import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaSalesRepository } from "@/repositories/prisma/prismaSalesRepository"
import { ListSalesUseCase } from "@/use-cases/list-sales-use-case"

export async function list(request: FastifyRequest, reply: FastifyReply) {
    
    try {
        const prismaSaleRepository = new PrismaSalesRepository()
        const listSalesUseCase = new ListSalesUseCase(prismaSaleRepository)
        const sales = await listSalesUseCase.execute()

        return reply.status(200).send({ sales })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Nenhuma venda foi realizada" })
        }
    }
}