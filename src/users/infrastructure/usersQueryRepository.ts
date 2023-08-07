import {UsersModelClass} from "../domain/db";
import {FindUsersPayload} from "../domain/types/usersTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/getSkipNumber";


export const usersQueryRepository = {
    async findUsers({searchNameTerm, sortDirection, sortBy, pageSize, pageNumber}: FindUsersPayload) {

        const filter = {name: {$regex: searchNameTerm, $options: "i"}}

        const users = await UsersModelClass
            .find(filter)
            // .project({_id: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()
        const totalCount = await UsersModelClass.countDocuments(filter)

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: users.map(u => (
                {
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    age: u.age
                }))
        }
    },

    async findUserById(id: string) {

        const user = await UsersModelClass
            .findOne({id: id})
            .lean()

        if (!user) {
            return null
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age
        }
    },

    async myAccount (id: string) {

        const user = await UsersModelClass
            .findOne({id: id})
            .lean()

        if (!user) {
            return null
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age
        }
    }


}

