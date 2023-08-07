import {Request, Response} from "express";
import {usersQueryRepository} from "../infrastructure/usersQueryRepository";
import {usersService, UsersService} from "../application/usersService";
import {queryValidation} from "../../middlewares/queryValidation";
import {authService} from "../application/authService";


export class UsersControllers {
    userService: UsersService

    constructor() {
        this.userService = new UsersService()
    }

    async getUsers(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = queryValidation(req.query)
        const foundUsers = await usersQueryRepository.findUsers({
            searchNameTerm, sortDirection, sortBy, pageSize, pageNumber
        })
        return res.status(200).send(foundUsers)
    }

    async getUserById(req: Request, res: Response) {
        const foundUsers = await usersQueryRepository.findUserById(req.params.id)
        if (foundUsers) {
            res.status(200).send(foundUsers)
        } else {
            res.sendStatus(404)
        }
    }

    async myAccount(req: Request, res: Response) {
        const foundUsers = await usersQueryRepository.myAccount(req.user.id)
        if (foundUsers) {
            res.status(200).send(foundUsers)
        } else {
            res.sendStatus(404)
        }
    }

    async createUsers(req: Request, res: Response) {
        const newUsers = await usersService.createUsers(req.body.name, req.body.password, req.body.email, req.body.age)

        return res.status(201).send(newUsers)

    }

    async updateUsers(req: Request, res: Response) {
        const updateUsers = await usersService.updateUsers(req.params.id, req.body.name, req.body.email, req.body.age)

        if (updateUsers) {
            res.send(204)
        } else {
            res.sendStatus(404)
        }
    }

    async deleteUsers(req: Request, res: Response) {
        const isDelete = await usersService.deleteUsers(req.params.id)
        if (isDelete) {
            res.send(204)
        } else {
            res.sendStatus(404)
        }
    }

    async singInAccount(req: Request, res: Response) {
        const result = await authService.login(req.body.login, req.body.password)
        if (result) {
            return res.status(200).cookie("refreshToken", result.refreshToken,
                {expires: new Date(Date.now() + 6000000), httpOnly: false, secure: false})
                .send({accessToken: result.accessToken})
        } else {
            return res.sendStatus(401)
        }
    }

    async refreshToken(req: Request, res: Response) {
        const result = await authService.login(req.body.login, req.body.password)
        if (result) {
            return res.status(200).cookie("refreshToken", result.refreshToken,
                {expires: new Date(Date.now() + 6000000), httpOnly: false, secure: false})
                .send({accessToken: result.accessToken})
        } else {
            return res.sendStatus(401)
        }
    }

}

export const usersControllers = new UsersControllers()