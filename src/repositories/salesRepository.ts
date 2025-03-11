import { Prisma, Sale } from "@prisma/client";

interface SalesRepositoryUpdateInput {
    buyer_name?: string
    cpf?: string
    price?: number
    address?: string[]
    pajamas?: string[]
    payment_method?: string
    installments?: number
    card_number?: string
}

export interface SalesRepository {
    create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>

}