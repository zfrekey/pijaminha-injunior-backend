import { Feedback } from "@prisma/client";

export interface FeedbackRepository {
    create(data: { name: string; description: string; rating: number }): Promise<Feedback>;
    findById(id: string): Promise<Feedback | null>;
    delete(id: string): Promise<void>;
}

