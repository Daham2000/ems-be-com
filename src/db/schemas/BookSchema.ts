import mongoose, { Schema } from "mongoose";
import IBook from "../Model/Book";

export interface IBookModel extends IBook, Document { }

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);