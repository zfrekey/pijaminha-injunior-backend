import { Prisma, Sale } from "@prisma/client";
import { SalesRepository } from "../salesRepository";
import { prisma } from "@/http/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {
    async create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
        const sales = await prisma.sale.create({ data })

        return sales
    }
}