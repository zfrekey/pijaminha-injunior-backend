export class FailedToDeleteFeedbackError extends Error {
    constructor() {
        super("Erro ao deletar feedback.");
        this.name = "FailedToDeleteFeedbackError";
    }
}
