import { Prisma, Sale } from "@prisma/client";

export interface SaleUpdateInput{
    buyer_name?: string
    cpf?: string
    address?: SaleAdress
    payment_method?: string
    installments?: number
    card_number?: string
    pajamas?:SalePajama[]
}

export interface SalePajama {
    zip_code?: string
    state?: string
    city?: string
    neighborhood?: string
    adress?: string
    number?: string
}

export interface SaleAdress {
    pajamaId?: string
    quantity?: number
}

export interface SalesRepository {
    create(data: Prisma.SaleCreateInput): Promise<Sale>

    findById(id: string):Promise<Sale | null>
    findByCpf(cpf: string): Promise<Sale[] | null>
    list(): Promise<Sale[] | null>

    delete(id: string): Promise<Sale | null>
    
    update(id: string, data: SaleUpdateInput): Promise<Sale | null>
}