import express from "express";
import * as dotenv from 'dotenv';
import ConnectDb from "./util/connectDB";

dotenv.config()

const app = express();
const port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.send("Hello world...");
});

app.listen(port, () => {
    console.log("Connected successfully...");
    ConnectDb();
});
