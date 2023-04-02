import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IOrganizationModel from '../db/schemas/OrganizationSchema';
import { registerOrganizationService } from '../db/services/OrganizationServices';
import { StatusCode } from '../util/statusCode';
import sendEmail from '../util/emailSender';
import { registerOrganizationTemplate } from '../util/emailTemplates';
import { addAdminUser } from '../db/services/ManageUserService';

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
        //send email to organization email
        const password = "12qwQW!@";
        addAdminUser(email,  "ORG0" + name, password);
        sendEmail("Your organization has been created succefully",
            registerOrganizationTemplate(name, email, password), email);
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};
