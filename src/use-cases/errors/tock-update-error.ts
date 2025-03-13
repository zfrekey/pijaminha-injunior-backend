export class StockUpdateError extends Error {
    constructor() {
        super("Erro ao atualizar o estoque do pijama.");
        this.name = "StockUpdateError";
    }
}
