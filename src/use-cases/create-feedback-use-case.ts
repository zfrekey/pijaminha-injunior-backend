import { Feedback } from "@prisma/client";
import { FailedToCreateFeedbackError } from "@/use-cases/errors/failed-to-create-feedback-error";
import { FeedbackRepository } from "@/repositories/feedbacksRepository";

interface CreateFeedbackRequest {
    name: string;
    description: string;
    rating: number;
}

export class CreateFeedbackUseCase {
    constructor(private feedbackRepository: FeedbackRepository) {}

    async execute({ name, description, rating }: CreateFeedbackRequest): Promise<Feedback> {
        try {
            return await this.feedbackRepository.create({ name, description, rating });
        } catch (error) {
            throw new FailedToCreateFeedbackError();
        }
    }
}

