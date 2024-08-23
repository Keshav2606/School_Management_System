import app from "./app.js";
import connectDB from "./db/index.js"
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server is listening at port: ", port);
    try{
        connectDB()
    } catch(error){
        console.error(error || "Error while connecting DB.")
    }
})

