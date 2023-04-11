import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IHolidayModel from '../db/schemas/HolidaySchema';
import { addHolidayService, getHolidayService } from '../db/services/HolidayServices';
import { StatusCode } from '../util/statusCode';
import { decodeToken } from '../util/decodeToken';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.orgID ? { "message": "Name can't be duplicate" } : "";
};

export const addHoliday = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { holidayTitle, eventDate } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = decodeToken(token ?? "");
        const orgId = decoded.orgId;

        const _id = new mongoose.Types.ObjectId();
        const holiId = "HOLI" + _id.toString().substring(1, 10);        
        const date = new Date(eventDate);
        
        const holiday = new IHolidayModel({
            _id,
            holiId,
            holidayTitle,
            eventDate: date,
            orgId
        });

        const result = await addHolidayService(holiday);
        
        if (result === StatusCode.CREATED) {
            return res.status(StatusCode.CREATED).json({ "success": "ok" });
        } else {
            return res.status(StatusCode.DATA_VALIDATION_ERROR).json({error: "Validate Error"});
        }
    } catch (e) {
        console.log(e);
        
        return res.status(StatusCode.FAILED).json({ e });
    }
};

export const getHolidayList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = decodeToken(token ?? "");
        const orgId = decoded.orgId;

        const holidayList = await getHolidayService(orgId ?? "");
        return res.status(StatusCode.SUCCESS).json(holidayList);
    } catch (e: any) {
        return res.status(StatusCode.FAILED).json({ e });
    }
};
