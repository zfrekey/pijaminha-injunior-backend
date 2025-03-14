import { prisma } from "@/http/lib/prisma";
import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sales_PajamasRepository } from "../salesPajamasRepository";


export class PrismaSale_PajamasRepository implements Sales_PajamasRepository {
    async create(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas | null> {
        const sale_pajamas = await prisma.sale_Pajamas.create({ data })

        return sale_pajamas
    }
}