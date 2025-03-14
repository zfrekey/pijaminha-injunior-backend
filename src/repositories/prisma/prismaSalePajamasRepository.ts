import { prisma } from "@/http/lib/prisma";
import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sales_PajamasRepository } from "../salesPajamasRepository";


export class PrismaSale_PajamasRepository implements Sales_PajamasRepository {
    async create(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas | null> {
        const sale_pajamas = await prisma.sale_Pajamas.create({ data })

        return sale_pajamas
    }

    async findOrCreate(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas> {
        const sale_pajamas = await prisma.sale_Pajamas.upsert({
            where: {
                saleId_pajamaId: { 
                    saleId: data.saleId,
                    pajamaId: data.pajamaId
                } 
            },
            update: { 
                quantity: {
                    increment: data.quantity
                },
                price: {
                    increment: data.price
                }
            },
            create: data
        })

        return sale_pajamas
    }
}