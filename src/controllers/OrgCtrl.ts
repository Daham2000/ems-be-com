import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IOrganizationModel from '../db/schemas/OrganizationSchema';
import { registerOrganizationService } from '../db/services/OrganizationServices';
import { StatusCode } from '../util/statusCode';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.orgID ? { "message": "Name can't be duplicate" } : "";
};

export const registerOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const { email, tag, name } = req.body;

    const organization = new IOrganizationModel({
        _id: new mongoose.Types.ObjectId(),
        orgID: "ORG0" + name,
        organizationName: name,
        campanyTag: tag,
        email
    });

    const result = await registerOrganizationService(organization);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};
