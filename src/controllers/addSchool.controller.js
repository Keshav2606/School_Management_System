import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

const addSchool = asyncHandler(async (req, res) => {
    const {name, address, latitude, longitude} = req.body;

    if(
        [name, address, latitude, longitude].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required.")
    }

    let query = `INSERT INTO schools (name, address, latitude, longitude)\
     VALUES (${name}, ${address}, ${latitude}, ${longitude})`

    await conn.query(query, (error, result) => {
        if(error){
            throw new ApiError(500, "Something went wrong while inserting data.")
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            "Data inserted successfully.",
            {}
        ))
    })
}) 

export default addSchool;