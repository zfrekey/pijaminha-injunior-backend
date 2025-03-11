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
    })

    const createAddressSchema = z.object({
        zip_code: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        street: z.string(),
        number: z.string(),
    })

    const {
        buyer_name,
        cpf,
        price,
        payment_method,
        installments,
        card_number} = createBodySchema.parse(request.body);

    const {
        zip_code,
        state,
        city,
        neighborhood,    
        address,
        street,
        number} = createAddressSchema.parse(request.body);

    try {
        const addressRepository = new PrismaAddressRepository();
        const salesRepository = new PrismaSalesRepository();
        const createSalesUseCase = new CreateSaleUseCase(salesRepository, addressRepository);

        const sale = await createSalesUseCase.execute({
            buyer_name,
            cpf,
            price, 
            payment_method,
            installments,
            card_number,
            address: {
                zip_code,
                state,
                city,
                neighborhood,
                address,
                street,
                number
            }
        });

        return reply.status(201).send(sale);
    } catch (err) {
        if (err instanceof ItemAlreadyExistsError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO CRIAR FEEDBACK:", err);
        return reply.status(500).send({ message: "Erro interno ao criar pijama" });
    }
}