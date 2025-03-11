import { Prisma, Sale } from "@prisma/client";
import { SalesRepository } from "../salesRepository";
import { prisma } from "@/http/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {
    async create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
        const sales = await prisma.sale.create({ data })

        return sales
    }

    async findById(id: string): Promise<Sale | null> {
        const sale = await prisma.sale.findUnique({
            where: {
                id
            }
        })
        return sale
    }

    async findByCpf(cpf: string): Promise<Sale[] | null> {
        const sales = await prisma.sale.findMany({
            where: {
                cpf
            }
        })
        return sales
    }

    async listAll(): Promise<Sale[]> {
        const allSales = await prisma.sale.findMany()
        return allSales
    }
}