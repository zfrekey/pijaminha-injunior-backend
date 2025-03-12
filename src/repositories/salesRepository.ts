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
    findById(id: string): Promise<Sale | null>
    findByCpf(cpf: string): Promise<Sale[] | null>
    list(): Promise<Sale[]>
}