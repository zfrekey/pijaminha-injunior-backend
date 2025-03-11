import { PajamasRepository } from "@/repositories/pajamasRepository"
import { Pajama } from "@prisma/client"

interface CreatePajamaUseCaseRequest {
    name: string
    description: string
    image: string
    price: number
    season: string
    type: string
    gender: string
    favorite: boolean
    on_sale: boolean
    sale_percent?: number
}

export class CreatePajamaUseCase {
    constructor(private pajamaRepository: PajamasRepository) { }
    async execute({name, description, image, price, season, type, gender, favorite, on_sale, sale_percent}: CreatePajamaUseCaseRequest):Promise<Pajama>{

        try {
            return await this.pajamaRepository.create({ name, description, image, price, season, type, gender, favorite, on_sale, sale_percent });

        } catch (error) {
            throw new Error("Erro ao criar pajama");
        }

    }

} 