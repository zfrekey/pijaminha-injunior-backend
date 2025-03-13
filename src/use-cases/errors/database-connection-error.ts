export class DatabaseConnectionError extends Error {
    constructor() {
        super("Erro ao conectar ao banco de dados.");
        this.name = "DatabaseConnectionError";
    }
}
