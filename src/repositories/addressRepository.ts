import { Address, Prisma } from "@prisma/client";

/* 
export interface AddressUpdateInput {
    zip_code?: string
    state?: string
    city?: string
    neighborhood?: string
    address?: string
    street?: string
    number?: string
} 
*/

export interface AddressRepository {
    findOrCreate(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
    countSales(id: string): Promise<number>
    delete(id: string): Promise<Address | null>
}