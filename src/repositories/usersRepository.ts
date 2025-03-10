import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput{
    name?: string
    username?: string
    email?: string
    password?: string
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>

    findByEmail(email: string): Promise<User | null>
    findById(userId: string):Promise<User | null>
    findByUsername(username: string): Promise<User | null>
    list(): Promise<User[]>

    deleteUser(userId: string): Promise<User | null>
    
    update(userId: string, data: UserUpdateInput): Promise<User | null>
}