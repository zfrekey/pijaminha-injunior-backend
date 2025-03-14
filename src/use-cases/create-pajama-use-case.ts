import { PajamasRepository } from "@/repositories/pajamasRepository"
import { PajamaSizesRepository } from "@/repositories/pajamasSizesRepository"
import { Pajama } from "@prisma/client"
import { randomInt } from "crypto"

interface CreatePajamaUseCaseRequest {
    name: string
    description: string
    image: string
    price: number
    season: string
    type: string
    gender: string
    favorite?: boolean
    on_sale?: boolean
    sale_percent?: number
}

interface CreatePajamaSizes {
    stock_quantity: number
    size: string
    pajamaId: string
}

export class CreatePajamaUseCase {
    constructor(private pajamaRepository: PajamasRepository, private pajamaSizesRepository: PajamaSizesRepository) { }
    async execute({name, description, image, price, season, type, gender, favorite, on_sale, sale_percent}: CreatePajamaUseCaseRequest):Promise<Pajama>{


        const lista: CreatePajamaSizes[] = []
        const listaSizes = ['PP', 'P', 'M', 'G', 'GG']
        const pajama = await this.pajamaRepository.create({ name, description, image, price, season, type, gender, favorite, on_sale, sale_percent });

        for (let i = 0; i < 5; i++){
            lista.push({
                stock_quantity: randomInt(0,15),
                size: listaSizes[i],
                pajamaId: pajama.id
            })
        }

        await this.pajamaSizesRepository.createMany(lista)

        return pajama

    }

} 