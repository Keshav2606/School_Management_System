import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";


const listSchools = (req, res) => {
    const {latitude, longitude} = req.body;

    const query = `
        SELECT id, name, address, latitude, longitude,
        SQRT(POW(latitude - ${latitude}, 2) + POW(longitude - ${longitude}, 2)) AS distance
        FROM schools
        ORDER BY distance;
    `;

    conn.query(query, (error, result) => {
        if(error){
            throw new ApiError(500, "Unable to fetch data.")
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            "Schools data fetched successfully.",
            result
        ))
    })
}

export default listSchools;