import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const addSchool = (req, res) => {

    const {name, address, latitude, longitude} = req.body;

    if(!(name && address && latitude && longitude)){
        throw new ApiError(400, "All fields are required.")
    }

    let query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)"

    conn.query(query, [name, address, latitude, longitude] , (error, result) => {
        if(error){
            console.error("ERR: ", error)
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            "Data inserted successfully.",
            result
        ))
    })
}

export default addSchool;