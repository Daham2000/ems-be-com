import mongoose, { Schema } from "mongoose";
import IPerformanceReport from "../Model/PerformanceReport";

export interface IPerformanceReportModel extends IPerformanceReport, Document { }

const PerformanceReportSchema: Schema = new Schema(
    {
        perId: { type: String, required: true, unique: true },
        empID: { type: String, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
        qualityOfWork: { type: Number, required: true },
        speedRate: { type: Number, required: true },
        trustRate: { type: Number, required: true },
        givenTargets: { type: Number, required: true },
        achivedTargets: { type: Number, required: true },
        description: { type: String, required: true },
        overviewRate: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPerformanceReportModel>('PerformanceReport', PerformanceReportSchema);