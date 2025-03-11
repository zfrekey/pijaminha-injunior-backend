import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/userAlreadyExists.js"
import { StringLiteralType } from "typescript"

interface RegisterUseCaseRequest {
    name: string
    username: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({name,username, email,password}: RegisterUseCaseRequest) {

        const user = await this.userRepository.findByEmail(email)
    
        if(user){
            throw new UserAlreadyExists()
        }
    
        const password_hash = await hash(password, 6)

        await this.userRepository.create({
            name,
            username,
            email,
            password: password_hash,
        })
    }

}