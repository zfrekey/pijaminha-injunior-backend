import { Address, Prisma } from "@prisma/client";

export interface AddressUpdateInput {
    zip_code?: string
    state?: string
    city?: string
    neighborhood?: string
    address?: string
    street?: string
    number?: string
}

export interface AddressRepository {
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
}