import { Sale } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { SalesRepository } from "@/repositories/salesRepository"

interface GetSaleUseCaseRequest {
    id: string
}

interface GetSaleUseCaseResponse {
    sale: Sale
}

export class GetSaleUseCase {
    constructor(private salesRepository: SalesRepository) {}

    async execute({id}: GetSaleUseCaseRequest): Promise<GetSaleUseCaseResponse> {
        const sale = await this.salesRepository.findById(id)

        if(!sale) {
            throw new ResourceNotFoundError()
        }
        return { sale }
    }

}