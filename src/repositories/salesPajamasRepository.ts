import { Prisma, Sale_Pajamas } from "@prisma/client";

export interface Sales_PajamasRepository {
    createMany(data: Prisma.Sale_PajamasCreateManyInput[]): Promise<void>
}

