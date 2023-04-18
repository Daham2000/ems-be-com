import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IHoliday from '../../db/schemas/HolidaySchema';

export const addHolidayService = (holiday: Document) => {
    return holiday
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const getHolidayService = (orgId: string): Promise<Document[]> => {
    return IHoliday
        .find({
            orgId,
            eventDate: {
                $gte: new Date(),
            }
        })
        .then((res) => { return res; })
        .catch((error) => { return error; });
};