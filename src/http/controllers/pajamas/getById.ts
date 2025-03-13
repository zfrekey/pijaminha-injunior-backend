import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository";
import { FastifyRequest, FastifyReply } from "fastify";


export async function getPajamaById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const pajamasRepository = new PrismaPajamaRepository();
        const pajama = await pajamasRepository.get(id);

        if (!pajama) {
            return reply.status(404).send({ message: "Pijama não encontrado" });
        }

        return reply.status(200).send(pajama);
    } catch (err) {
        console.error("ERRO AO BUSCAR O PIJAMA:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar pijama" });
    }
}
