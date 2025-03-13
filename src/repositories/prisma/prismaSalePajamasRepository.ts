import { prisma } from "@/http/lib/prisma";
import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sales_PajamasRepository } from "../salesPajamasRepository";


export class PrismaSale_PajamasRepository implements Sales_PajamasRepository {
    async createMany(data: Prisma.Sale_PajamasCreateManyInput[]): Promise<void> {
        await prisma.sale_Pajamas.createMany({data})
        
    }
}