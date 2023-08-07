import * as dotenv from "dotenv";

dotenv.config()
import {UserAccountDBType} from "./types/usersTypes";
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URL || ""
const dbName = process.env.DB_NAME || ""

const userSchema = new mongoose.Schema<UserAccountDBType>({
    id: String,
    name: String,
    email: String,
    age: Number,
    password: String
})

export const UsersModelClass = mongoose.model('users', userSchema)

export async function runDb() {
    try {
        await mongoose.connect(mongoUri, {dbName})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        await mongoose.disconnect()
    }
}