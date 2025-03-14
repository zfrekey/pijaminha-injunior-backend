import { FeedbackRepository } from "@/repositories/feedbacksRepository"
import { Feedback } from "@prisma/client"


interface ListFeedbackUseCaseResponse {
    feedback: Feedback[]
}

export class ListFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbackRepository) {}

    async execute(): Promise<ListFeedbackUseCaseResponse> {
        if (!this.feedbacksRepository) {
            throw new Error("Repositório de feedbacks não instanciado")
        }

        const feedback = await this.feedbacksRepository.list()

        return { feedback  }
    }
}