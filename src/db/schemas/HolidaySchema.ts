import mongoose, { Schema } from "mongoose";
import IHoliday from "../Model/Holiday";

export interface IHolidayModel extends IHoliday, Document { }

const HolidaySchema: Schema = new Schema(
    {
        holiId: { type: String, required: true, unique: true },
        holidayTitle: { type: String, required: true },
        eventDate: { type: String, required: true },
        orgId: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IHolidayModel>('Holiday', HolidaySchema);