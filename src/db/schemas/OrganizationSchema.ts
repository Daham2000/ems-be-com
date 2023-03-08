import mongoose, { Schema } from "mongoose";
import IOrganization from "../Model/Organization";

export interface IOrganizationModel extends IOrganization, Document { }

const OrganizationSchema: Schema = new Schema(
    {
        orgID: { type: String, required: true, unique: true },
        organizationName: { type: String, required: true, unique: true },
        campanyTag: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IOrganizationModel>('Orgnization', OrganizationSchema);