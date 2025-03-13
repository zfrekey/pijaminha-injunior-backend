import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllPajamasUseCase } from "@/use-cases/get-all-pajamas-use-case";
import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository";

export async function getAllPajamas(request: FastifyRequest, reply: FastifyReply) {
    try {
        const pajamasRepository = new PrismaPajamaRepository();
        const getAllPajamasUseCase = new GetAllPajamasUseCase(pajamasRepository);

        const pajamas = await getAllPajamasUseCase.execute();

        return reply.status(200).send(pajamas);
    } catch (err) {
        console.error("ERRO AO BUSCAR OS PIJAMAS:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar pijamas" });
    }
}
