import { PrismaClient, Feedback } from "@prisma/client";
import { FeedbackRepository } from "../feedbacksRepository";


const prisma = new PrismaClient();

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create(data: { name: string; description: string; rating: number }): Promise<Feedback> {
        return await prisma.feedback.create({ data });
    }

    async findById(id: string): Promise<Feedback | null> {
        return await prisma.feedback.findUnique({ where: { id: id } }); 
    }

    async delete(id: string): Promise<void> {
        await prisma.feedback.delete({ where: { id: id } }); 
    }
}

