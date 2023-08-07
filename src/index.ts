import express from 'express'
import cookieParser from "cookie-parser";
import {runDb} from "./users/domain/db";
import * as dotenv from "dotenv";
import cors from 'cors';
import {usersRouter} from "./users/api/usersRouter";

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


const port = process.env.PORT || 5002

app.use("/api",usersRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server stared on port ${port}`)
})}
//start app
startApp()




