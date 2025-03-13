import { Pajama } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { PajamasRepository } from "@/repositories/pajamasRepository"

interface GetPajamaUseCaseRequest {
    id: string
}

interface GetPajamaUseCaseResponse {
    pajama: Pajama
}

export class GetPajamaUseCase {
    constructor(private pajamaRepository: PajamasRepository) {}

    async execute({id}: GetPajamaUseCaseRequest): Promise<GetPajamaUseCaseResponse> {
        const pajama = await this.pajamaRepository.get(id)

        if(!pajama) {
            throw new ResourceNotFoundError()
        }
        return { pajama }
    }

}