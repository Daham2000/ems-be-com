import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import IAnnouncementModel from '../db/schemas/AnnouncementSchema';
import { addAnnouncementService } from '../db/services/AnnouncementService';
import { StatusCode } from '../util/statusCode';
import validateUserToken from '../util/validateUser';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.orgID ? { "message": "Name can't be duplicate" } : "";
};

export const addAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    const { announcementTitle, message, date, sendBy, sendTo } = req.body;

    const ann = new IAnnouncementModel({
        _id: new mongoose.Types.ObjectId(),
        annId: "ANN0_" + uuid(),
        announcementTitle,
        date,
        message,
        sendBy,
        sendTo,
        orgId: "ORG"
    });

    const result = await addAnnouncementService(ann);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};
