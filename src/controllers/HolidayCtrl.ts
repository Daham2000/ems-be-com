import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IHolidayModel from '../db/schemas/HolidaySchema';
import { addHolidayService } from '../db/services/HolidayServices';
import { StatusCode } from '../util/statusCode';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.orgID ? { "message": "Name can't be duplicate" } : "";
};

export const addHoliday = async (req: Request, res: Response, next: NextFunction) => {
    const { holidayTitle, eventDate } = req.body;

    const holiday = new IHolidayModel({
        _id: new mongoose.Types.ObjectId(),
        holiId: "HOLI0_" + holidayTitle,
        holidayTitle,
        eventDate,
        orgId: "ORG"
    });

    const result = await addHolidayService(holiday);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};
