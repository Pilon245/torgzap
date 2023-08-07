import {usersService} from "./usersService";
import {jwtService} from "../../helpers/jwtService";

export class AuthService {
    async login(login: string, password: string) {
        const user = await usersService.checkCredentials(login, password)
        if (user) {
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user)
            return {accessToken: accessToken, refreshToken: refreshToken}
        } else {
            return false
        }
    }

    async refreshToken(name: string, token: string) {
        const user = await usersService.checkRefreshToken(name)
        if (user) {
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user)
            return {accessToken: accessToken, refreshToken: refreshToken}
        } else {
            return false
        }
    }

}

export const authService = new AuthService()