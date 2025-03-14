export class InvalidInputError extends Error {
    constructor(message: string) {
        super(`Dados inválidos: ${message}`);
        this.name = "InvalidInputError";
    }
}
