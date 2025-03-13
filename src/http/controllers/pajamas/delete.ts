import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePajamaUseCase } from "@/use-cases/delete-pajama-use-case";
import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository";

export async function deletePajama(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const pajamasRepository = new PrismaPajamaRepository();
        const deletePajamaUseCase = new DeletePajamaUseCase(pajamasRepository);

        await deletePajamaUseCase.execute(id);

        return reply.status(204).send();
    } catch (err) {
        console.error("ERRO AO DELETAR O PIJAMA:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar pijama" });
    }
}
