import { PajamaSize, Prisma } from "@prisma/client";

export interface PajamaSizeUpdateInput {
    stock_quantity?: number
}

export interface PajamaSizesRepository {
    createMany(data: Prisma.PajamaSizeCreateManyInput[]): Promise<void>
    findBy(pajamaId: string, size: string): Promise<PajamaSize | null> 
    update(id: string, data: PajamaSizeUpdateInput): Promise<PajamaSize | null>
}