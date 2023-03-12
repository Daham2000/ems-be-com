import mongoose, { Schema } from "mongoose";
import IEmployee from "../Model/Employee";

export interface IEmployeeModel extends IEmployee, Document { }

const EmployeeSchema: Schema = new Schema(
    {
        empID: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        nic: { type: String, required: true },
        userRole: { type: String, required: false },
        joinedDate: { type: String, required: true },
        isAvailable: { type: Boolean, required: true },
        jobTitle: { type: String, required: true },
        birthDay: { type: String, required: true },
        orgID: { type: String, required: true },
        contactNum: { type: Number, required: true },
        email: { type: String, required: true },
        image: { type: String, required: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);