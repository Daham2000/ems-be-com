import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

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
    organization: {
        create: Joi.object<any>({
            name: Joi.string().required(),
            tag: Joi.string().required(),
            email: Joi.string().required()
        })
    }
};