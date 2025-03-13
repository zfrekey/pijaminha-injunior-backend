import { Sale } from "@prisma/client";
import { SalesRepository, SaleUpdateInput } from "@/repositories/salesRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";

export class UpdateSaleUseCase {
    constructor(private salesRepository: SalesRepository) {}

    async execute(id: string, data: SaleUpdateInput): Promise<Sale> {
        const existingSale = await this.salesRepository.get(id);

        if (!existingSale) {
            throw new ResourceNotFoundError("Venda");
        }

        const updatedSale = await this.salesRepository.update(id, data);

        if (!updatedSale) {
            throw new ResourceNotFoundError("Venda");
        }

        return updatedSale;
    }
}
