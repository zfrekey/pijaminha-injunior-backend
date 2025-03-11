import { Address, Prisma, Sale, Sale_Pajamas } from "@prisma/client";

export interface SaleUpdateInput{
    buyer_name?: string
    cpf?: string
    adress?: Address
    payment_method?: string
    installments?: number
    card_number?: string
    pajamas?:Sale_Pajamas[]
}

export interface SalePajama {
    pajamaId?: string;
    quantity?: number;
}

export interface SalesRepository {
    create(data: Prisma.SaleCreateInput): Promise<Sale>

    findById(id: string):Promise<Sale | null>
    findByCpf(cpf: string): Promise<Sale[] | null>
    list(): Promise<Sale[]>

    delete(id: string): Promise<Sale | null>
    
    update(id: string, data: SaleUpdateInput): Promise<Sale | null>
}