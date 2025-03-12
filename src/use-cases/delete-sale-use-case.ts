import { Sale } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { AddressRepository } from "@/repositories/addressRepository"
import { SalesRepository } from "@/repositories/salesRepository"

interface DeleteSaleUseCaseRequest {
    id: string
}

interface DeleteSaleUseCaseResponse {
    sale: Sale
}

export class DeleteSaleUseCase {
    constructor(private salesRepository: SalesRepository, private addressRepository: AddressRepository) {}

    async execute({id}: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
        const sale = await this.salesRepository.findById(id)
        if(!sale) {
            throw new ResourceNotFoundError()
        }

        if (sale.addressId) {
            const addressSales = await this.addressRepository.countSales(sale.addressId)
            
            if(addressSales === 1) {
                await this.addressRepository.delete(sale.addressId)
            }
         }
         
        await this.salesRepository.delete(id)
                
        return { sale }
    }

}