import { Feedback } from "@prisma/client";
import { FeedbackNotFoundError } from "@/use-cases/errors/feedback-not-found-error";
import { FeedbackRepository } from "@/repositories/feedbacksRepository";

export class GetFeedbackUseCase {
    constructor(private feedbackRepository: FeedbackRepository) {}

    async execute(id: string): Promise<Feedback> {
        const feedback = await this.feedbackRepository.findById(id);

        if (!feedback) {
            throw new FeedbackNotFoundError();
        }

        return feedback;
    }
}

