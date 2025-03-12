import { Prisma, Sale_Pajamas } from "@prisma/client";

export interface Sales_PajamasRepository {
    create(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas>
}