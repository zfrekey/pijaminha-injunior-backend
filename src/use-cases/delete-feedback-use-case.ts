import { FeedbackNotFoundError } from "@/use-cases/errors/feedback-not-found-error";
import { FailedToDeleteFeedbackError } from "@/use-cases/errors/failed-to-delete-feedback-error";
import { FeedbackRepository } from "@/repositories/feedbacksRepository";

export class DeleteFeedbackUseCase {
    constructor(private feedbackRepository: FeedbackRepository) {}

    async execute(id: string): Promise<void> {
        const feedback = await this.feedbackRepository.findById(id);

        if (!feedback) {
            throw new FeedbackNotFoundError();
        }

        try {
            await this.feedbackRepository.delete(id);
        } catch (error) {
            throw new FailedToDeleteFeedbackError();
        }
    }
}

