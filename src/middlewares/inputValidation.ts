import {Response, Request, NextFunction} from 'express';
import Joi from "joi";
import {usersQueryRepository} from "../users/infrastructure/usersQueryRepository";
import {jwtService} from "../helpers/jwtService";

export const inputCreateBody = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().empty().required(),
        email: Joi.string().email().required(),
        age: Joi.number().empty().required(),
        password: Joi.string().empty().min(8).max(30).required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    } else {
        next()
    }
}

export const inputUpdateBody = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().empty().required(),
        email: Joi.string().email().required(),
        age: Joi.number().empty().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    } else {
        next()
    }
}

export const inputAuthBodyValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        login: Joi.string().empty().required(),
        password: Joi.string().empty().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    } else {
        next()
    }
}

export const inputParamsValidation = (req: Request, res: Response, next: NextFunction) => {

    const isUserExists = async (id: string) => {
        const user = await usersQueryRepository.findUserById(id);
        if (!user) {
            return false
        }
        return true;
    };

    const customValidator = (value: any, helpers: any) => {
        if (!isUserExists(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    };

    const schema = Joi.string().custom(customValidator, 'user.exists').required();


    const {error, value} = schema.validate(req.params.id);

    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        next()
    }
}

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.sendStatus(401)
        return
    }
    const token = refToken.split(' ')[0]


    const foundUser = await jwtService.getUserIdByRefreshToken(token)
    if (!foundUser) return res.sendStatus(401)


    const user = await usersQueryRepository.findUserById(foundUser.id)
    if (!user) return res.sendStatus(401)
    req.user = user
    return next()

}

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersQueryRepository.findUserById(userId)
        next()
        return
    }
    res.sendStatus(401)
}