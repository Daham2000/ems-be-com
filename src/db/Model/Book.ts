import mongoose, { Document, Schema } from 'mongoose';

export default interface IBook {
    title: string;
    author: string;
}