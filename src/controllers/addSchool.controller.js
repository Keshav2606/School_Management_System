import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const addSchool = (req, res) => {

    let {name, address, latitude, longitude} = req.body;

    if(!(name && address && latitude && longitude)){
        throw new ApiError(400, "All fields are required.")
    }

    if(typeof name !== "string" && typeof address !== "string"){
        throw new ApiError(400, "Name & Address should be in String format.")
    }

    latitude = Number(latitude)
    longitude = Number(longitude)

    if(typeof latitude !== "number" || typeof longitude !== "number" || isNaN(latitude) || isNaN(longitude)){
        throw new ApiError(400, "Latitide and Longitude should be in Number format.")
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