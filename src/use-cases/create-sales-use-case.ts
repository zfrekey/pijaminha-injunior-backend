import { AddressRepository } from "@/repositories/addressRepository"
import { PrismaPajamaRepository } from "@/repositories/prisma/prismaPajamasRepository"
import { PrismaPajamaSizeRepository } from "@/repositories/prisma/prismaPajamasSizeRepository"
import { PrismaSale_PajamasRepository } from "@/repositories/prisma/prismaSalePajamasRepository"
import { SalesRepository } from "@/repositories/salesRepository"
import { Sale } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { InsufficientStockError } from "./errors/insufficient-stock-error"

interface CreateSaleUseCaseRequest {
    buyer_name: string
    cpf: string
    payment_method: string
    installments?: number
    card_number?: string
    address: AddressRequest

    pajamas: Pajama[]
}

interface AddressRequest {
    zip_code: string
    state: string
    city: string
    neighborhood: string
    address: string 
    number: string
}

interface Pajama {
    pajamaId: string
    quantity: number
    size: string
}

export class CreateSaleUseCase {
    constructor(private salesRepository: SalesRepository, private addressRepository: AddressRepository) {}

    async execute({buyer_name, cpf, payment_method, installments, card_number, address, pajamas}: CreateSaleUseCaseRequest):Promise<Sale | null>{

        const sizeRepository = new PrismaPajamaSizeRepository()
        const sale_pajamaRepository = new PrismaSale_PajamasRepository()
        const pajamaRepository = new PrismaPajamaRepository()

        let price = 0

        for (let i = 0; i < pajamas.length; i++) {

            const pajamaSize = await  sizeRepository.findBy(pajamas[i].pajamaId, pajamas[i].size)
            if(!pajamaSize){
                throw new ResourceNotFoundError()
            }
            if( pajamaSize.stock_quantity < pajamas[i].quantity ){
                throw new InsufficientStockError()
            }

            const pajama = await pajamaRepository.get(pajamas[i].pajamaId)
            if(!pajama){
                throw new ResourceNotFoundError()
            }

            price += pajama.price * pajamas[i].quantity
        }


        const endereco = await this.addressRepository.findOrCreate({
            ...address,  
        });
        
        if(!endereco){
            throw new InvalidCredentialsError()
        }

        const sale = await this.salesRepository.create({
            buyer_name,
            cpf,
            price,
            payment_method,
            installments,
            card_number,
            addressId : endereco.id
        });

        if(!sale){
            throw new ResourceNotFoundError()
        }

        for (let i = 0; i < pajamas.length;  i++){
        
            const pajama = await pajamaRepository.get(pajamas[i].pajamaId)
            
            if(!pajama){
                throw new InvalidCredentialsError()
            }

            await sale_pajamaRepository.findOrCreate({
                saleId: sale.id,
                pajamaId: pajamas[i].pajamaId,
                quantity: pajamas[i].quantity,
                price : pajama.price * pajamas[i].quantity
                
            })
            const pajamaSize = await sizeRepository.findBy(pajama.id, pajamas[i].size)
            if( !pajamaSize){
                throw new ResourceNotFoundError()
            }

            const newStock = pajamaSize.stock_quantity - pajamas[i].quantity
            
        
            await sizeRepository.update(pajamaSize.id, {
                stock_quantity : newStock
            })

        }
    
        return sale 
    }
}