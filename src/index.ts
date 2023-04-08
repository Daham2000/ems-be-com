import express from "express";
import * as dotenv from 'dotenv';
import ConnectDb from "./util/connectDB";
import orgRoutes from './routes/OrganizationRoutes';
import empRoutes from './routes/EmployeeRoutes';
import perRoutes from './routes/PerformanceRoutes';
import hoRoutes from './routes/HolidayRoutes';
import motivationRoutes from './routes/MotivationRoutes';
import AnnouncementRoutes from './routes/AnnouncementRoutes';

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
app.use('/performance-report', perRoutes);
app.use('/holidays', hoRoutes);
app.use('/motivation-add', motivationRoutes);
app.use('/', AnnouncementRoutes);

app.listen(port, () => {
    console.log("Connected successfully...");
    ConnectDb();

    // Initialize the default app
    let admin = require('firebase-admin');
    let app = admin.initializeApp({
        credential: admin.credential.cert("./ems-pro-com-4cf5781adc9c.json")
    });
});
