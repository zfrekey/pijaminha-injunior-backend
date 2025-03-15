import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { ListUserUseCase } from "@/use-cases/list-user-use-case"
import { PrismaFeedbackRepository } from "@/repositories/prisma/prismaFeedbacksRepository"
import { ListFeedbackUseCase } from "@/use-cases/list-feedback-use-case"


export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository()
        const listFeedbacksUseCase = new ListFeedbackUseCase(prismaFeedbackRepository)
        const { feedback } = await listFeedbacksUseCase.execute()

        return reply.status(200).send( feedback )
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Usuários não encontrados" })
        }
    }
}