import config from "../../../../config.js";
import logger from "../../../../logger.js";
import mysql from "mysql2/promise";

const DbConfig = {
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
};

const poolPromise = (async () => {
  try {
    const pool = await mysql.createPool(DbConfig);
    const sql = "select 1";
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      logger.info("Connected to MySQL database successfully!");
      return pool;
    }
  } catch (err) {
    logger.error("Database Connection Failed! Bad Config: ", err);
    // throw err;
  }
})();

export { poolPromise };
