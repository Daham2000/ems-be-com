import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IEmployee from '../db/schemas/EmployeeSchema';
import IPerformance from '../db/schemas/PerformanceSchema';
import IMotivationRequest from '../db/schemas/MotivationSchema';
import { addEmployeeService, addPerformanceReportService, deleteEmployeeService, deletePerformanceReportService, getEmployeeService, getPerformanceReportService, updateEmployeeService, updatePerformanceReportService } from '../db/services/EmployeeServices';
import { addMotivationReqService } from "../db/services/EmployeeServices";
import { StatusCode } from '../util/statusCode';
import { uuid } from 'uuidv4';
import { decodeToken } from '../util/decodeToken';

export const ValidateErrorRegisterOrg = (result: any) => {
    return result.keyPattern.email ? { "message": "Email can't be duplicate" } :
        result.keyPattern.nic ? { "message": "NIC can't be duplicate" } : "";
};

export const getEmployeeList = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token ?? "");
    const orgId = decoded.orgId;

    const list = await getEmployeeService(orgId ?? "");
    return res.status(StatusCode.SUCCESS).json(list);
};

export const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { name, passwordHash, userName, address, nic,
        userRole, joinedDate, isAvailable, jobTitle, birthDay, contactNum, email, image } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token ?? "");
    const orgID = decoded.orgId;

    const employee = new IEmployee({
        _id: new mongoose.Types.ObjectId(),
        name,
        orgID,
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

    const result = await addEmployeeService(employee);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, name, empID, passwordHash, userName, address, nic,
        userRole, joinedDate, isAvailable, jobTitle, birthDay, contactNum, email, image } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decodeToken(token ?? "");
    const orgID = decoded.orgId;

    const employee = {
        _id,
        name,
        orgID,
        empID,
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
    };

    const result = await updateEmployeeService(employee);

    if (result === StatusCode.SUCCESS) {
        return res.status(StatusCode.SUCCESS).json({ "success": "ok" });
    } else {
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ result });
    }
};

export const deletePerformanceReport = async (req: Request, res: Response, next: NextFunction) => {
    const empID = req.query.empID;
    const perId = req.query.perId;

    try {
        await deletePerformanceReportService(empID?.toString(), perId?.toString());
        return res.status(StatusCode.SUCCESS).json({ "success": "ok" });
    } catch (e) {
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error: e });
    }
}

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const empID = req.query.empID;
    const result = await deleteEmployeeService(empID?.toString() ? empID?.toString() : "");
    if (result === StatusCode.SUCCESS) {
        return res.status(StatusCode.SUCCESS).json({ "success": "ok" });
    } else {
        const error = ValidateErrorRegisterOrg(result);
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ error });
    }
}

export const addPerformance = async (req: Request, res: Response, next: NextFunction) => {
    const { empID, month, year, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description } = req.body;

    const overviewRate = speedRate + trustRate + qualityOfWork;

    const report = {
        _id: new mongoose.Types.ObjectId(),
        perId: empID + "_" + month + year, year, empID, month, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description, overviewRate
    };

    const result = await addPerformanceReportService(report);

    if (result === StatusCode.CREATED) {
        return res.status(StatusCode.CREATED).json({ "success": "ok" });
    } else {
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ "error": result });
    }

};

export const getPerformanceReportList = async (req: Request, res: Response, next: NextFunction) => {
    const empID = req.query.empID ?? "";
    try {
        const list = await getPerformanceReportService(empID.toString());
        return res.status(StatusCode.SUCCESS).json(list);
    } catch (e) {
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ "error": e });
    }
};

export const updatePerformanceReport = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, empID, month, year, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description, overviewRate } = req.body;

    const employee = {
        _id,
        perId: empID + "_" + month + year, year, empID, month, qualityOfWork, speedRate,
        trustRate, givenTargets, achivedTargets, description, overviewRate
    };

    const result = await updatePerformanceReportService(employee);

    if (result === StatusCode.SUCCESS) {
        return res.status(StatusCode.SUCCESS).json({ "success": "ok" });
    } else {
        return res.status(StatusCode.DATA_VALIDATION_ERROR).json({ result });
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