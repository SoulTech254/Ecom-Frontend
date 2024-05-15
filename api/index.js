import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js"
dotenv.config();

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("Server is running in port 8080!!");
});

app.use("/api/auth",authRoute)