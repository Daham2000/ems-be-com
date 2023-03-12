import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IEmployee from '../db/schemas/EmployeeSchema';
import { addEmployeeService } from '../db/services/EmployeeServices';
import { StatusCode } from '../util/statusCode';

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
