import { Sale } from "@prisma/client"
import { SalesRepository } from "@/repositories/salesRepository"

interface ListSalesUseCaseResponse {
    sales: Sale[]
}

export class ListSalesUseCase {
    constructor(private salesRepository: SalesRepository) {}

    async execute(): Promise<ListSalesUseCaseResponse> {
        if (!this.salesRepository) {
            throw new Error("Repositório de vendas não instanciado")
        }

        const sales = await this.salesRepository.list()

        return { sales }
    }
}