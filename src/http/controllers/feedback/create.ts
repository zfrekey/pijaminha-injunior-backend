import { FastifyRequest, FastifyReply } from "fastify";
import { CreateFeedbackUseCase } from "@/use-cases/create-feedback-use-case";
import { FailedToCreateFeedbackError } from "@/use-cases/errors/failed-to-create-feedback-error";
import { z } from "zod";
import { PrismaFeedbackRepository } from "@/repositories/prisma/prismaFeedbackRepository";

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
    const createFeedbackSchema = z.object({
        name: z.string(),
        description: z.string(),
        rating: z.number().min(0).max(5)
    });

    try {
        const { name, description, rating } = createFeedbackSchema.parse(request.body);
        const feedbackRepository = new PrismaFeedbackRepository();
        const createFeedbackUseCase = new CreateFeedbackUseCase(feedbackRepository);

        const feedback = await createFeedbackUseCase.execute({ name, description, rating });

        return reply.status(201).send(feedback);
    } catch (err) {
        if (err instanceof FailedToCreateFeedbackError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO CRIAR FEEDBACK:", err);
        return reply.status(500).send({ message: "Erro interno ao criar feedback" });
    }
}


