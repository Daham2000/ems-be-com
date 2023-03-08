import mongoose from "mongoose";

const ConnectDb = () => {
    mongoose.connect(process.env.APP_DBURL || "")
        .then(() => {
            console.log('Connected to the database ')
        })
        .catch((err: any) => {
            console.error(`Error connecting to the database. n${err}`);
        });
};

export default ConnectDb;