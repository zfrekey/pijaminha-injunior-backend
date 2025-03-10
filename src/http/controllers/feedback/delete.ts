import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteFeedbackUseCase } from "@/use-cases/delete-feedback-use-case";
import { FeedbackNotFoundError } from "@/use-cases/errors/feedback-not-found-error";
import { FailedToDeleteFeedbackError } from "@/use-cases/errors/failed-to-delete-feedback-error";
import { PrismaFeedbackRepository } from "@/repositories/prisma/prismaFeedbackRepository";

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const feedbackRepository = new PrismaFeedbackRepository();
        const deleteFeedbackUseCase = new DeleteFeedbackUseCase(feedbackRepository);

        await deleteFeedbackUseCase.execute(id);

        return reply.status(204).send();
    } catch (err) {
        if (err instanceof FeedbackNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        if (err instanceof FailedToDeleteFeedbackError) {
            return reply.status(500).send({ message: err.message });
        }

        console.error("ERRO AO DELETAR FEEDBACK:", err);
        return reply.status(500).send({ message: "Erro interno ao deletar feedback" });
    }
}


