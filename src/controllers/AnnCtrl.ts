import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import IAnnouncementModel from '../db/schemas/AnnouncementSchema';
import { addAnnouncementService } from '../db/services/AnnouncementService';
import { StatusCode } from '../util/statusCode';
import jwt_decode, { JwtPayload } from "jwt-decode";
import sendEmail from '../util/emailSender';
import { announcmentTemplate } from '../util/emailTemplates';
import { getOrganization } from '../db/services/OrganizationServices';
import { getEmployeeEmailListService } from '../db/services/EmployeeServices';
import { decodeToken } from '../util/decodeToken';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.orgID ? { "message": "Name can't be duplicate" } : "";
};

export const addAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    const { announcementTitle, message, date, sendBy, sendTo } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token ?? "");
    const orgId = decoded.orgId;

    const ann = new IAnnouncementModel({
        _id: new mongoose.Types.ObjectId(),
        annId: "ANN0_" + uuid(),
        announcementTitle,
        date,
        message,
        sendBy,
        sendTo,
        orgId
    });

    const result = await addAnnouncementService(ann);

    if (result === StatusCode.CREATED) {
        try {            
            const organization = await getOrganization(orgId ?? "");
            
            const emailList = await getEmployeeEmailListService(orgId ?? "");
            sendEmail(`${organization.organizationName} Offcial Announcement`, announcmentTemplate(`${organization.organizationName} Offcial Announcement`, message, organization.organizationName), emailList);
            return res.status(StatusCode.CREATED).json({ "success": "ok" });
        } catch (e: any) {
            console.log(e);
            return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ e });
        }

    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};
