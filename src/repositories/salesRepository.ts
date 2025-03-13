import { Sale, Prisma } from "@prisma/client";

export interface SaleUpdateInput {
    buyer_name?: string;
    cpf?: string;
    price?: number;
    address?: {
        zip_code?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        address?: string;
        number?: string;
    };
    payment_method?: string;
    installments?: number;
    card_number?: string | null;
    pajamas?: { pajamaId: string; quantity: number }[];
}

export interface SalesRepository {
    create(data: Prisma.SaleCreateInput): Promise<Sale>;
    get(id: string): Promise<Sale | null>;
    update(id: string, data: SaleUpdateInput): Promise<Sale | null>;
    delete(id: string): Promise<Sale>;
    getAll(): Promise<Sale[]>;
}
