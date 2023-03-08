import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import IBook from '../db/Model/Book';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);            
            next();
        } catch (error) {
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};