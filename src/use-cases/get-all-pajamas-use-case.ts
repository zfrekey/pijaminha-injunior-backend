import { Pajama } from "@prisma/client";
import { PajamasRepository } from "@/repositories/pajamasRepository";

export class GetAllPajamasUseCase {
    constructor(private pajamasRepository: PajamasRepository) {}

    async execute(): Promise<Pajama[]> {
        return await this.pajamasRepository.getAll();
    }
}
