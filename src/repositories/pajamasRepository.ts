import { Pajama, Prisma } from "@prisma/client";

export interface PajamaUpdateInput {
    name?: string
    description?: string
    image?: string
    price?: number
    season?: string
    type?: string
    gender?: string
    sizes?: string[]
    favorite?: boolean
    on_sale?: boolean
    sale_percent?: number
    sales?: string[]
}

export interface PajamasRepository {

    create(data: Prisma.PajamaCreateInput): Promise<Pajama>

}