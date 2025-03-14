import { Pajama } from "@prisma/client";
import { PajamasRepository, PajamaUpdateInput } from "@/repositories/pajamasRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { StockUpdateError } from "./errors/tock-update-error";


export class UpdatePajamaUseCase {
    constructor(private pajamasRepository: PajamasRepository) {}

    async execute(id: string, data: PajamaUpdateInput): Promise<Pajama> {
        const existingPajama = await this.pajamasRepository.get(id);

        if (!existingPajama) {
            throw new ResourceNotFoundError();
        }

        if (data.sizes && data.sizes.some(s => s.stock_quantity < 0)) {
            throw new StockUpdateError();
        }

        const updatedPajama = await this.pajamasRepository.update(id, data);

        if (!updatedPajama) {
            throw new ResourceNotFoundError();
        }

        return updatedPajama;
    }
}



