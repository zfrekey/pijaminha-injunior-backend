import { Prisma,Address } from "@prisma/client";

export interface AddressesRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address>

    findById(id: string):Promise<Address | null>
    findByAdressUnique(zip_code: string, number: string): Promise<Address | null>

    delete(id: string): Promise<Address | null>    
}