import { Sale } from "@prisma/client"
import { SalesRepository } from "@/repositories/salesRepository"
import { ResourceNotFoundError } from "./errors/resourceNotFound"

interface GetSaleByCpfUseCaseRequest {
    cpf: string
}

interface GetSaleByCpfUseCaseResponse {
    sales: Sale[]
}

export class GetSaleByCpfUseCase {
    constructor(private salesRepository: SalesRepository) {}

    async execute({cpf}:GetSaleByCpfUseCaseRequest): Promise<GetSaleByCpfUseCaseResponse> {
        if (!this.salesRepository) {
            throw new Error("Repositório de vendas não instanciado")
        }

        const sales = await this.salesRepository.findByCpf(cpf)

        if (!sales || sales.length === 0) {
            throw new ResourceNotFoundError
       }

        return { sales }
    }
}