import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IEmployee from '../../db/schemas/EmployeeSchema';
import IPerformance from '../../db/schemas/PerformanceSchema';

//Employee manage services section
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

//Performance report services section
export const addPerformanceReportService = (report: Document) => {
    return report
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const updatePerformanceReportService = (report: any) => {
    return IPerformance
        .updateOne(report)
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const deletePerformanceReportService = (pId: string) => {    
    return IPerformance
        .deleteOne({pId})
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const getPerformanceReportService = () => {
    return IPerformance.find().then((res) => {
        return res;
    }).catch((error) => { return error; });
};

//Motivational section
export const addMotivationReqService = (motiReq: Document) => {
    return motiReq
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};