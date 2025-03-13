export class PajamaAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um pijama com este nome.");
        this.name = "PajamaAlreadyExistsError";
    }
}
