import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IEmployee from '../../db/schemas/EmployeeSchema';
import IPerformance from '../../db/schemas/PerformanceSchema';
import { Constants } from "../../util/constant";
import MotivationSchema from "../schemas/MotivationSchema";

//Employee manage services section
export const addEmployeeService = (employee: Document) => {
    return employee
        .save()
        .then((res) => {
            return StatusCode.CREATED;
        })
        .catch((error) => { return error; });
};

export const updateEmployeeService = (employee: any) => {
    return IEmployee
        .findByIdAndUpdate(employee._id, employee)
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const deleteEmployeeService = (empID: string) => {
    return IEmployee
        .deleteOne({ empID })
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const getEmployeeService = (orgID: string) => {
    return IEmployee.find({ orgID }).then((res) => {
        return res;
    }).catch((error) => { return error; });
};

export const getSingleEmployeeService = (orgID: string, email: string) => {
    return IEmployee.findOne({ orgID, email }).then((res) => {
        return res;
    }).catch((error) => { return error; });
};

export const getOneEmployeeService = (empID: string) => {
    return IEmployee.findOne({ empID }).then((res) => {
        return res;
    }).catch((error) => { return error; });
};

export const getEmployeeEmailListService = (orgID: string, sendTo: string) => {
    let list = [];
    return IEmployee.find(sendTo === "All Employees" ? { orgID } : { orgID, userRole: sendTo }, { "email": 1, "_id": 0 }).then((res) => {
        list = res.map((element: any) => {
            return element.email;
        })
        return list;
    }).catch((error) => { return error; });
};

export const getEmployeeNumberListService = (orgID: string, sendTo: string): any => {
    let list = [];
    return IEmployee.find(sendTo === "All Employees" ? { orgID } : { orgID, userRole: sendTo }, { "contactNum": 1, "_id": 0 }).then((res) => {
        list = res.map((element: any) => {
            return element.contactNum;
        })
        return list;
    }).catch((error) => { return error; });
};

//Performance report services section
export const addPerformanceReportService = async (report: any): Promise<number> => {
    try {
        const docs = await IPerformance.find({ empID: report.empID, year: report.year, month: report.month });
        if (docs.length > 0) {
            return StatusCode.DATA_VALIDATION_ERROR;
        }
        await IPerformance.create(report);
        return StatusCode.CREATED;
    } catch (e) {
        return StatusCode.DATA_VALIDATION_ERROR;
    }
};

export const updatePerformanceReportService = (_id: string, report: any) => {
    return IPerformance
        .findByIdAndUpdate(_id, report)
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const deletePerformanceReportService = (empID?: string, pId?: string) => {
    return IPerformance
        .deleteOne({ pId })
        .then((res) => { return StatusCode.SUCCESS; })
        .catch((error) => { return error; });
};

export const getPerformanceReportService = (empID: string) => {
    return IPerformance.find({ empID }).then((res) => {
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

export const getMotivationsService = (orgID: string) => {
    return MotivationSchema.find({ orgID }).then((res) => {
        return res;
    }).catch((error) => { return error; });
};