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
    },
    employee: {
        add: Joi.object<any>({
            name: Joi.string().required(),
            passwordHash: Joi.string().required(),
            userName: Joi.string().required(),
            address: Joi.string().required(),
            nic: Joi.string().required(),
            userRole: Joi.string().required(),
            joinedDate: Joi.string().required(),
            isAvailable: Joi.boolean().required(),
            jobTitle: Joi.string().required(),
            birthDay: Joi.string().required(),
            contactNum: Joi.number().required(),
            email: Joi.string().required(),
            image: Joi.string().required()
        }),
        update: Joi.object<any>({
            name: Joi.string().required(),
            empID: Joi.string().required(),
            _id: Joi.string().required(),
            orgID: Joi.string().required(),
            passwordHash: Joi.string().required(),
            userName: Joi.string().required(),
            address: Joi.string().required(),
            nic: Joi.string().required(),
            userRole: Joi.string().required(),
            joinedDate: Joi.string().required(),
            isAvailable: Joi.boolean().required(),
            jobTitle: Joi.string().required(),
            birthDay: Joi.string().required(),
            contactNum: Joi.number().required(),
            email: Joi.string().required(),
            image: Joi.string().required()
        })
    },
    performance: {
        add: Joi.object<any>({
            empID: Joi.string().required(),
            month: Joi.string().required(),
            year: Joi.number().required(),
            qualityOfWork: Joi.number().required(),
            speedRate: Joi.number().required(),
            trustRate: Joi.number().required(),
            givenTargets: Joi.number().required(),
            achivedTargets: Joi.number().required(),
            description: Joi.string().required(),
            overviewRate: Joi.number().required()
        }),
        update: Joi.object<any>({
            empID: Joi.string().required(),
            perId: Joi.string().required(),
            createdAt: Joi.string().required(),
            updatedAt: Joi.string().required(),
            _id: Joi.string().required(),
            month: Joi.string().required(),
            year: Joi.number().required(),
            qualityOfWork: Joi.number().required(),
            speedRate: Joi.number().required(),
            trustRate: Joi.number().required(),
            givenTargets: Joi.number().required(),
            achivedTargets: Joi.number().required(),
            description: Joi.string().required(),
            overviewRate: Joi.number().required()
        })
    },
    holiday: {
        add: Joi.object<any>({
            holidayTitle: Joi.string().required(),
            eventDate: Joi.string().required()
        })
    },
    motivation: {
        add: Joi.object<any>({
            empId: Joi.string().required(),
            description: Joi.string().required()
        })
    },
    announcement: {
        add: Joi.object<any>({
            announcementTitle: Joi.string().required(),
            date: Joi.string().required(),
            sendBy: Joi.string().required(),
            sendTo: Joi.string().required(),
            message: Joi.string().required()
        })
    }
};