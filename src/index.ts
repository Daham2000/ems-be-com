import express from "express";
import * as dotenv from 'dotenv';
import ConnectDb from "./util/connectDB";
import orgRoutes from './routes/OrganizationRoutes';
import empRoutes from './routes/EmployeeRoutes';

dotenv.config()

const app = express();
const port = process.env.APP_PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world...");
});
app.use('', orgRoutes);
app.use('/employee', empRoutes);

app.listen(port, () => {
    console.log("Connected successfully...");
    ConnectDb();
});
