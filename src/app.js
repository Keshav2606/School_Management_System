import express from "express";
import cors from "cors";
import listSchools from "./controllers/listSchools.controller.js";
import addSchool from "./controllers/addSchool.controller";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb"}));

app.route("/addSchool", addSchool);
app.route("/listSchools", listSchools);


export default app;