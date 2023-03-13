import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";

export const addEmployeeService = (employee: Document) => {
    return employee
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const addPerformanceReportService = (report: Document) => {
    return report
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const addMotivationReqService = (motiReq: Document) => {
    return motiReq
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};