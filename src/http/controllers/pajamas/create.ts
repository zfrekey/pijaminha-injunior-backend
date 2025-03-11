import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository";
import { CreatePajamaUseCase } from "@/use-cases/create-pajama-use-case";
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists";
import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";


export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number(),
        season: z.string(),
        type: z.string(),
        gender: z.string(),
        favorite: z.boolean(),
        on_sale: z.boolean(),
        sale_percent: z.number().optional()
    });

    const { name, description, image, price, season, type, gender, favorite, on_sale, sale_percent } = createBodySchema.parse(request.body);
    try {
        const pajamasRepository = new PrismaPajamaRepository();
        const createPajamaUseCase = new CreatePajamaUseCase(pajamasRepository);

        const pajama = await createPajamaUseCase.execute({ name, description, image, price, season, type, gender, favorite, on_sale, sale_percent });

        return reply.status(201).send(pajama);
    } catch (err) {
        if (err instanceof ItemAlreadyExistsError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO CRIAR FEEDBACK:", err);
        return reply.status(500).send({ message: "Erro interno ao criar pijama" });
    }
}
