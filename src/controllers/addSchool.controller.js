import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const addSchool = async (req, res) => {
    console.log("req body: ", req.body)
    const {name, address, latitude, longitude} = req.body;

    if(!(name && address && latitude && longitude)){
        throw new ApiError(400, "All fields are required.")
    }

    console.log("inserted data: ", {
        name,
        address,
        latitude,
        longitude
    })

    let query = `INSERT INTO schools (name, address, latitude, longitude)\
     VALUES (${name}, ${address}, ${latitude}, ${longitude})`

    await conn.query(query, (error, result) => {
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