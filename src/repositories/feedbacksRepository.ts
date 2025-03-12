import { Feedback, Prisma } from "@prisma/client";

export interface FeedbackRepository {
    create(data: Prisma.FeedbackCreateInput): Promise<Feedback>;
    findById(id: string): Promise<Feedback | null>;
    delete(id: string): Promise<void>;
}

