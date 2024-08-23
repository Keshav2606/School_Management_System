import mysql from "mysql2";
import fs from "fs";

export var conn = null;
const connectDB = () => {
    // conn = mysql.createConnection({
    //     host: process.env.MYSQL_HOST,
    //     user: process.env.MYSQL_USERNAME,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.DB_NAME,
    //     ssl: {
    //         ca: fs.readFileSync('src/db/ca.pem')
    //     }
    // });

    conn = mysql.createConnection(process.env.MYSQL_URI)

    conn.connect((error) => {
        if(error){
            console.error("DB connection failed: ", error);
            process.exit(1)
        }
        
        console.log("MySQL Database connected successfully.")

        var sql = "CREATE TABLE IF NOT EXISTS schools (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, address VARCHAR(255), latitude FLOAT NOT NULL, longitude FLOAT NOT NULL)";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Schools Table created successfully.", result);
        });
    })
}

export default connectDB;