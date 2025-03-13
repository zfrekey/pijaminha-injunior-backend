import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateSaleUseCase } from "@/use-cases/update-sale-use-case";
import { z } from "zod";
import { PrismaSalesRepository } from "@/repositories/prisma/prismaSalesRepository";

export async function updateSale(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const updateSaleSchema = z.object({
        buyer_name: z.string().optional(),
        cpf: z.string().optional(),
        price: z.number().optional(),
        address: z.object({
            zip_code: z.string().optional(),
            state: z.string().optional(),
            city: z.string().optional(),
            neighborhood: z.string().optional(),
            address: z.string().optional(),
            number: z.string().optional()
        }).optional(),
        payment_method: z.string().optional(),
        installments: z.number().optional(),
        card_number: z.string().optional(),
        pajamas: z.array(z.object({
            pajamaId: z.string(),
            quantity: z.number()
        })).optional()
    });

    try {
        const data = updateSaleSchema.parse(request.body);
        const salesRepository = new PrismaSalesRepository();
        const updateSaleUseCase = new UpdateSaleUseCase(salesRepository);

        const updatedSale = await updateSaleUseCase.execute(id, data);

        return reply.status(200).send(updatedSale);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR A VENDA:", err);
        return reply.status(500).send({ 
            message: "Erro interno ao atualizar venda",
            error: err instanceof Error ? err.message : "Erro desconhecido"
        });
    }
}
