import mysql from "mysql";

export const conn = null;
const connectDB = async () => {
    conn = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DB_NAME
    });

    conn.connect((error) => {
        if(error){
            console.error("DB connection failed: ", error);
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