import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IEmployee from '../../db/schemas/EmployeeSchema';

export const addEmployeeService = (employee: Document) => {
    return employee
        .save()
        .then((res) => {
         return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const updateEmployeeService = (employee: any) => {
    return IEmployee
        .updateOne(employee)
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const deleteEmployeeService = (empID: string) => {    
    return IEmployee
        .deleteOne({empID})
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const getEmployeeService = () => {
    return IEmployee.find().then((res) => {
        return res;
    }).catch((error) => { return error; });
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