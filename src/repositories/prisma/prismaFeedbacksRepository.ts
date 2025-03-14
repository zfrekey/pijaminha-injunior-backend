import { Feedback, Prisma } from "@prisma/client";
import { FeedbackRepository } from "../feedbacksRepository";
import { prisma } from "@/http/lib/prisma";



export class PrismaFeedbackRepository implements FeedbackRepository {
    async create(data: Prisma.FeedbackUncheckedCreateInput): Promise<Feedback> {
        const feedback = await prisma.feedback.create({ data })
        return feedback
    }

    async findById(id: string): Promise<Feedback | null> {
        const feedback = await prisma.feedback.findUnique({ where: { id } });
        return feedback
    }

    async list(): Promise<Feedback[]> {
        const feedbacks = await prisma.feedback.findMany()
        return feedbacks
    }

    async delete(id: string): Promise<void> {
        const feedback = await prisma.feedback.findUnique({ where: { id } });
        await feedback
    }
}

