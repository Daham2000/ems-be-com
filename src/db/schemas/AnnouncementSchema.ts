import mongoose, { Schema } from "mongoose";
import IHoliday from "../Model/Holiday";

export interface IAnnouncementModel extends IHoliday, Document { }

const AnnouncementSchema: Schema = new Schema(
    {
        annId: { type: String, required: true, unique: true },
        announcementTitle: { type: String, required: true },
        message: { type: String, required: true },
        sendBy: { type: String, required: true },
        sendTo: { type: Array, required: true },
        orgId: { type: Array, required: true },
        date: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IAnnouncementModel>('Annoucement', AnnouncementSchema); AnnouncementSchema