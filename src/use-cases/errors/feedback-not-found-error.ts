export class FeedbackNotFoundError extends Error {
    constructor() {
        super("Feedback não encontrado.");
        this.name = "FeedbackNotFoundError";
    }
}
