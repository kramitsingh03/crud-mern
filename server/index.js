import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// Check if MONGOURL is defined
if (!URL) {
    console.error("Error: MONGOURL environment variable is not defined.");
    process.exit(1);
}

console.log(`Server is running on port: ${PORT}`);
mongoose.connect(URL)
    .then(() => {
        console.log("DB Connected successfully");
        app.listen(PORT, () => {
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });


app.use("/api",route);