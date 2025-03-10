export class FailedToCreateFeedbackError extends Error {
    constructor() {
        super("Erro ao criar feedback.");
        this.name = "FailedToCreateFeedbackError";
    }
}
