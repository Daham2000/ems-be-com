import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import IBook from '../db/schemas/BookSchema';

export const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { author, title } = req.body;

    const book = new IBook({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};