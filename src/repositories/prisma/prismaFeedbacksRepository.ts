import { PrismaClient, Feedback } from "@prisma/client";
import { FeedbackRepository } from "../feedbacksRepository";
import { prisma } from "@/http/lib/prisma";



export class PrismaFeedbackRepository implements FeedbackRepository {
    async create(data: { name: string; description: string; rating: number }): Promise<Feedback> {
        const feedback = await prisma.feedback.create({ data })
        return feedback
    }

    async findById(id: string): Promise<Feedback | null> {
        const feedback = await prisma.feedback.findUnique({ where: { id: id } });
        return feedback
    }

    async delete(id: string): Promise<void> {
        const feedback = await prisma.feedback.findUnique({ where: { id: id } });
        await feedback
    }
}

