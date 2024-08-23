import express from "express";
import cors from "cors";
import listSchools from "./controllers/listSchools.controller.js";
import addSchool from "./controllers/addSchool.controller.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb"}));

app.route("/addSchool").post(addSchool);
app.route("/listSchools").get(listSchools);


export default app;