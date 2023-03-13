import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";

export const addHolidayService = (holiday: Document) => {
    return holiday
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};