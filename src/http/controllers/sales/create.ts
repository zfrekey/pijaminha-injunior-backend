import { PrismaAddressRepository } from "@/repositories/prisma/prismaAddressRepository";
import { PrismaSalesRepository } from "@/repositories/prisma/prismaSalesRepository";
import { CreateSaleUseCase } from "@/use-cases/create-sales-use-case";
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        buyer_name: z.string(),
        cpf: z.string(),
        payment_method: z.enum(['Pix', 'Credit Card', 'Debit Card']),
        installments: z.number().optional(),
        card_number: z.string().optional(),
        address: z.object({
            zip_code: z.string(),
            state: z.string(),
            city: z.string(),
            neighborhood: z.string(),
            address: z.string(),
            number: z.string(),
        }),
        pajamas: z.array(z.object({
            pajamaId: z.string(),
            quantity: z.number().int().positive(),
            size: z.enum(['PP','P', 'M', 'G', 'GG'])
        }))
    });

    try {
        const { 
            buyer_name, 
            cpf, 
            payment_method, 
            installments, 
            card_number, 
            address, 
            pajamas 
        } = createBodySchema.parse(request.body);

        const addressRepository = new PrismaAddressRepository();
        const salesRepository = new PrismaSalesRepository();
        const createSalesUseCase = new CreateSaleUseCase(salesRepository, addressRepository);

        const sale = await createSalesUseCase.execute({
            buyer_name,
            cpf,
            payment_method,
            installments,
            card_number,
            address,
            pajamas
        });

        return reply.status(201).send(sale);
    } catch (err) {
        if (err instanceof ItemAlreadyExistsError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO CRIAR VENDA:", err);
        return reply.status(500).send({ message: "Erro interno ao criar venda" });
    }
}
