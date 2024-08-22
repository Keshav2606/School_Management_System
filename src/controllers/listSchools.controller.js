import { conn } from "../db/index.js";
import { ApiError } from "../utils/ApiError.utils.js";


const listSchools = (req, res) => {
    const {latitude, longitude} = req.body;

    const query = `
        SELECT id, name, address, latitude, longitude,
        SQRT(POW(latitude - ${latitude}, 2) + POW(longitude - ${longitude}, 2)) AS distance
        FROM schools
        ORDER BY distance;
    `;

    const data = conn.query(query, (error, result) => {
        if(error){
            throw new ApiError(500, "Unable to fetch data.")
        }
    })
    console.log(data)
}

export default listSchools;