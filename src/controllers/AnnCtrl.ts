import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import IAnnouncementModel from '../db/schemas/AnnouncementSchema';
import { addAnnouncementService, getAnnouncementService } from '../db/services/AnnouncementService';
import { StatusCode } from '../util/statusCode';
import jwt_decode, { JwtPayload } from "jwt-decode";
import sendEmail from '../util/emailSender';
import { announcmentTemplate } from '../util/emailTemplates';
import { getOrganization } from '../db/services/OrganizationServices';
import { getEmployeeEmailListService, getEmployeeNumberListService } from '../db/services/EmployeeServices';
import { decodeToken } from '../util/decodeToken';
import { SendMessageService } from '../db/services/MessageService';

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

            //send emails to employees of the organization
            const emailList = await getEmployeeEmailListService(orgId ?? "", sendTo);
            sendEmail(`${organization.organizationName} Offcial Announcement`, announcmentTemplate(`${organization.organizationName} Offcial Announcement`, message, organization.organizationName), emailList);

            //send the announcement as a sms message to the staff members
            const numberList = await getEmployeeNumberListService(orgId ?? "", sendTo);
            SendMessageService(numberList, message, `${organization.organizationName} Offcial Announcement \n\n` + announcementTitle);
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

export const getAnnoucementList = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token ?? "");
    const orgId = decoded.orgId;

    try {
        if (orgId !== undefined) {
            const list = await getAnnouncementService(orgId.toString());
            return res.status(StatusCode.SUCCESS).json(list);
        }
    } catch (e: any) {
        return res.status(StatusCode.FAILED).json({ error: e.message });
    }
};