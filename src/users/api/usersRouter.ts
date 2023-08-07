import {Router} from "express";
import {usersControllers} from "./usersControllers";
import {
    authTokenMiddleware,
    inputAuthBodyValidation,
    inputCreateBody,
    inputParamsValidation, inputUpdateBody,
    refreshTokenMiddleware
} from "../../middlewares/inputValidation";

export const usersRouter = Router({})


usersRouter.get('/users', usersControllers.getUsers.bind(usersControllers))
usersRouter.get('/users/:id', inputParamsValidation, usersControllers.getUserById.bind(usersControllers))
usersRouter.post('/users', inputCreateBody, usersControllers.createUsers.bind(usersControllers))
usersRouter.put('/users/:id', inputParamsValidation, inputUpdateBody, usersControllers.updateUsers.bind(usersControllers))
usersRouter.delete('/users/:id', inputParamsValidation, usersControllers.deleteUsers.bind(usersControllers))


usersRouter.get('/my-account', authTokenMiddleware, usersControllers.myAccount.bind(usersControllers))
usersRouter.post('/login', inputAuthBodyValidation, usersControllers.singInAccount.bind(usersControllers))
usersRouter.post('/refresh-token', inputAuthBodyValidation, refreshTokenMiddleware, usersControllers.refreshToken.bind(usersControllers))
