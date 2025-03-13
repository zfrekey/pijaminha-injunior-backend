import { Pajama, PajamaSize, Prisma } from "@prisma/client";

export interface PajamaUpdateInput {
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    season?: string;
    type?: string;
    gender?: string;
    favorite?: boolean;
    on_sale?: boolean;
    sale_percent?: number;
    sizes?: { size: string; stock_quantity: number }[];
}

export interface PajamasRepository {
    create(data: Prisma.PajamaCreateInput): Promise<Pajama>;
    get(id: string): Promise<Pajama | null>;
    getAll(): Promise<Pajama[]>; 
    update(id: string, data: PajamaUpdateInput): Promise<Pajama | null>;
    delete(id: string): Promise<Pajama>;
}

