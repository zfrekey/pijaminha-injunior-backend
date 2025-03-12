import { PajamaSize, Prisma } from "@prisma/client";

export interface PajamaSizesRepository {
    createMany(data: Prisma.PajamaSizeCreateManyInput[]): Promise<void>
}