import { Pajama, Prisma } from "@prisma/client";

export interface PajamasRepository {

    create(data: Prisma.PajamaCreateInput): Promise<Pajama>

}