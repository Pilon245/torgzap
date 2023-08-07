import bcrypt from "bcrypt";
import {UsersRepository} from "../infrastructure/usersRepository";
import {_generatePasswordForDb} from "../../helpers/getSkipNumber";
import {UserAccountDBType} from "../domain/types/usersTypes";

export class UsersService {
    usersRepository: UsersRepository

    constructor() {
        this.usersRepository = new UsersRepository()
    }

    async checkCredentials(nameOrEmailL: string, password: string) {
        const user = await this.usersRepository.findNameOrEmail(nameOrEmailL)
        if (!user) {
            return false
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return false
        }
        return user
    }

    async checkRefreshToken(nameOrEmailL: string) {
        const user = await this.usersRepository.findNameOrEmail(nameOrEmailL)
        if (!user) {
            return false
        }
        return user
    }

    async createUsers(name: string, password: string, email: string, age: number) {
        const passwordHash = await _generatePasswordForDb(password)
        const newUsers = new UserAccountDBType(
            String(+new Date()),
            name,
            email,
            age,
            passwordHash,
        )

        await this.usersRepository.createUsers(newUsers)

        return {
            id: newUsers.id,
            name: newUsers.name,
            email: newUsers.email,
            age: newUsers.age
        }
    }

    async updateUsers(id: string, name: string, email: string, age: number): Promise<boolean> {
        return await this.usersRepository.updateUsers(id, name, email, age)
    }

    async deleteUsers(id: string): Promise<boolean> {
        return await this.usersRepository.deleteUsers(id)
    }

    async deleteAllUsers() {
        return await this.usersRepository.deleteAllUsers()
    }
}

export const usersService = new UsersService()