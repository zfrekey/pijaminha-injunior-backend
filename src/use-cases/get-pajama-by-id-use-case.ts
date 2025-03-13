import { Pajama } from "@prisma/client";
import { PajamasRepository } from "@/repositories/pajamasRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";


export class GetPajamaByIdUseCase {
    constructor(private pajamasRepository: PajamasRepository) {}

    async execute(id: string): Promise<Pajama> {
        const pajama = await this.pajamasRepository.get(id);

        if (!pajama) {
            throw new ResourceNotFoundError("Pijama");
        }

        return pajama;
    }
}

