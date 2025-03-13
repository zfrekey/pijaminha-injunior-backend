import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository";
import { UpdatePajamaUseCase } from "@/use-cases/update-pajama-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updatePajama(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const updatePajamaSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        price: z.number().optional(),
        season: z.string().optional(),
        type: z.string().optional(),
        gender: z.string().optional(),
        favorite: z.boolean().optional(),
        on_sale: z.boolean().optional(),
        sale_percent: z.number().optional(),
        sizes: z.array(z.object({
            size: z.string(),
            stock_quantity: z.number()
        })).optional()
    });

    try {
        const data = updatePajamaSchema.parse(request.body);
        const pajamasRepository = new PrismaPajamaRepository();
        const updatePajamaUseCase = new UpdatePajamaUseCase(pajamasRepository);

        const updatedPajama = await updatePajamaUseCase.execute(id, data);

        return reply.status(200).send(updatedPajama);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR O PIJAMA:", err);
        return reply.status(500).send({ message: "Erro interno ao atualizar pijama" });
    }
}
