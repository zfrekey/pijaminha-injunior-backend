import { PajamasRepository } from "@/repositories/pajamasRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";


export class DeletePajamaUseCase {
    constructor(private pajamasRepository: PajamasRepository) {}

    async execute(id: string): Promise<void> {
        const existingPajama = await this.pajamasRepository.get(id);

        if (!existingPajama) {
            throw new ResourceNotFoundError("Pijama");
        }

        await this.pajamasRepository.delete(id);
    }
}



