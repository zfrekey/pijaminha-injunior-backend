import { PajamaSize, Prisma } from "@prisma/client";

export interface PajamaSizesRepository {
    create(data: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>
}