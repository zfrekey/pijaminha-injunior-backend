import { Prisma, Sale } from "@prisma/client";
import { SalesRepository, SaleUpdateInput } from "../salesRepository";
import { prisma } from "@/http/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {

    async create(data: Prisma.SaleCreateInput){
        const sale = await prisma.sale.create({
            data
        })
            return sale
    }   

    async findById(id: string): Promise<Sale | null> {
        const sales = await prisma.sale.findUnique({
            where: {
                id
            }
        })
        return sales
    }

    async findByCpf(cpf: string): Promise<Sale[] | null> {
        const sales = await prisma.sale.findMany({
            where: {
                cpf
            }
        })
        return sales
    }

    async list(): Promise<Sale[]> {
        const sales = await prisma.sale.findMany()
        return sales
    }

    async delete(id: string): Promise<Sale | null> {
        const sale = await prisma.sale.delete({
            where: {
                id
            }
        })
        return sale
    }

    async update(id: string, data: SaleUpdateInput): Promise<Sale | null> {
        const sale = await prisma.sale.update({
            where: { id : id },  
            data: {
                buyer_name: data.buyer_name,
                cpf: data.cpf,
                payment_method: data.payment_method,
                installments: data.installments,
                card_number: data.card_number,
                //address: data.address,
                //pajamas: data.pajamas[]
            }
        })
        return sale
    }
}

