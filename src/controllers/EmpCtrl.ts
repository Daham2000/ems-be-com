import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IEmployee from '../db/schemas/EmployeeSchema';
import IPerformance from '../db/schemas/PerformanceSchema';
import IMotivationRequest from '../db/schemas/MotivationSchema';
import { addEmployeeService, addPerformanceReportService } from '../db/services/EmployeeServices';
import { addMotivationReqService } from "../db/services/EmployeeServices";
import { StatusCode } from '../util/statusCode';
import { uuid } from 'uuidv4';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.nic ? { "message": "NIC can't be duplicate" } : "";
};

export const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { name, passwordHash, userName, address, nic,
        userRole, joinedDate, isAvailable, jobTitle, birthDay, contactNum, email, image } = req.body;

    const organization = new IEmployee({
        _id: new mongoose.Types.ObjectId(),
        name,
        orgID: "o0011",
        empID: "E0_" + nic,
        passwordHash,
        userName,
        address,
        nic,
        userRole,
        joinedDate,
        isAvailable,
        jobTitle,
        birthDay,
        contactNum,
        email,
        image
    });

    const result = await addEmployeeService(organization);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};

export const addPerformance = async (req: Request, res: Response, next: NextFunction) => {
    const { empID, month, year, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description, overviewRate } = req.body;

    const report = new IPerformance({
        _id: new mongoose.Types.ObjectId(),
        perId: empID + "_" + month + year, year, empID, month, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description, overviewRate
    });

    const result = await addPerformanceReportService(report);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};

export const addMotivationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { empId, description } = req.body;

    const request = new IMotivationRequest({
        _id: new mongoose.Types.ObjectId(),
        reqId: "req0_" + uuid(),
        empId,
        description
    });

    const result = await addMotivationReqService(request);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
}