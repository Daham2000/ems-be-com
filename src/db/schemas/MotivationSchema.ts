import mongoose, { Schema } from "mongoose";
import IMotivationRequest from "../Model/MotivationRequest";

export interface IMotivationRequestModel extends IMotivationRequest, Document { }

const MotivationSchema: Schema = new Schema(
    {
        reqId: { type: String, required: true, unique: true },
        empId: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IMotivationRequestModel>('MotivationRequest', MotivationSchema);