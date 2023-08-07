import jwt from 'jsonwebtoken';
import {UserAccountDBType} from "../users/domain/types/usersTypes";
import {setting} from "./setting";



export const jwtService = {
    async createdJWT (user: UserAccountDBType) {
        const token = jwt.sign({id: user.id}, setting.JWT_SECRET, {expiresIn: '7m'})
        return token
    },
    async createdRefreshJWT (user: UserAccountDBType) {
        const refreshToken = jwt.sign({id: user.id},
            setting.JWT_SECRET, {expiresIn: '7m'})
        return refreshToken
    },
    async getUserIdByToken (token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result.id
        } catch (error) {
            return null
        }
    },
    async getUserIdByRefreshToken (token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result
        } catch (error) {
            return null
        }
    },
}