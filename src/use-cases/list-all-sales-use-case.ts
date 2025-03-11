import { Sale } from "@prisma/client"
import { SalesRepository } from "@/repositories/salesRepository"

interface ListallSalesUseCaseResponse {
    sales: Sale[]
}

export class ListallSalesUseCase {
    constructor(private salesRepository: SalesRepository) {}

    async execute(): Promise<ListallSalesUseCaseResponse> {
        if (!this.salesRepository) {
            throw new Error("Repositório de vendas não instanciado")
        }

        const sales = await this.salesRepository.listAll()

        return { sales }
    }
}