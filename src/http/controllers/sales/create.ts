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
        price: z.number(),
        payment_method: z.string(),
        installments: z.number(),
        card_number: z.string().optional(),
        address: z.object({
            zip_code: z.string(),
            state: z.string(),
            city: z.string(),
            neighborhood: z.string(),
            street: z.string(),  
            number: z.string()
        }),
        pajamas: z.array(
            z.object({
                pajamaId: z.string(),
                quantity: z.number(),
                price: z.number()
            })
        )
    });

    try {
        
        const validatedData = createBodySchema.parse(request.body);

        const addressRepository = new PrismaAddressRepository();
        const salesRepository = new PrismaSalesRepository();
        const createSalesUseCase = new CreateSaleUseCase(salesRepository, addressRepository);

        const sale = await createSalesUseCase.execute(validatedData);

        return reply.status(201).send(sale);
    } catch (err) {
        if (err instanceof ItemAlreadyExistsError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO CRIAR VENDA:", err);
        return reply.status(500).send({ message: "Erro interno ao criar venda" });
    }
}

