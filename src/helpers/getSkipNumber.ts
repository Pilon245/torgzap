import bcrypt from "bcrypt";
import {jwtService} from "./jwtService";

export const getSkipNumber = (pageNumber: number,pageSize: number) => {
    return (pageNumber - 1) * pageSize
}

export const getPagesCounts = (totalCount: number, pageSize: number) => {return (Math.ceil(totalCount/pageSize))}

export const _generatePasswordForDb = async (password: string, ) => {
        const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }


