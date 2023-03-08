import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world...");
});

const url = `mongodb+srv://Daham:3qweEWQ2@cluster0.8dcca.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.APP_DBURL || "")
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err: any) => {
        console.error(`Error connecting to the database. n${err}`);
    });

app.listen(port, () => {
    console.log("Connected successfully...");
});
