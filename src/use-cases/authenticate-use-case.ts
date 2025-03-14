import { UsersRepository } from "@/repositories/usersRepository"
import { UserAlreadyExists } from "./errors/userAlreadyExists"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError"
import { ResourceNotFoundError } from "./errors/resourceNotFound"

interface AuthenticateUseCaseRequest {
    identifier: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({identifier,password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        let user = await this.userRepository.findByEmailOrUsername(identifier)

        
    
        if(!user){
            throw new ResourceNotFoundError()
        }

        const doesPasswordMatches = await compare(password, user.password)
    
        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { user }

    }
}