import { FastifyRequest, FastifyReply } from "fastify";
import { GetFeedbackUseCase } from "@/use-cases/get-feedback-use-case";
import { FeedbackNotFoundError } from "@/use-cases/errors/feedback-not-found-error";
import { PrismaFeedbackRepository } from "@/repositories/prisma/prismaFeedbacksRepository";

export async function getFeedback(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const feedbackRepository = new PrismaFeedbackRepository();
        const getFeedbackUseCase = new GetFeedbackUseCase(feedbackRepository);
        const feedback = await getFeedbackUseCase.execute(id);

        return reply.status(200).send(feedback);
    } catch (err) {
        if (err instanceof FeedbackNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        console.error("ERRO AO BUSCAR FEEDBACK:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar feedback" });
    }
}



