import {UserAccountDBType} from "../domain/types/usersTypes";
import { UsersModelClass} from "../domain/db";

export class UsersRepository {
    async findNameOrEmail(nameOrEmailL: string) {
        const user = await UsersModelClass.findOne(
            {$or: [{name: nameOrEmailL},{email: nameOrEmailL}]})
        return user
    }

    async createUsers(newUsers: UserAccountDBType): Promise<UserAccountDBType> {
        await UsersModelClass.insertMany(newUsers)
        return newUsers
    }

    async updateUsers(id: string,name: string, email: string, age: number) : Promise<boolean> {
        const result = await UsersModelClass.updateOne({id: id}, {name, email, age})
        return result.matchedCount === 1
    }

    async deleteUsers(id: string): Promise<boolean> {
        const result = await UsersModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async deleteAllUsers() {
        return await UsersModelClass.deleteMany({})
    }
}
export const usersRepository =  new UsersRepository()