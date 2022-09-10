const { Pool } = require("pg");
require("dotenv").config();

const dbString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

const ssl =
  process.env.NODE_ENV === "production"
    ? {
        rejectUnauthorized: false,
      }
    : false;

const pool = new Pool({
  connectionString: dbString,
  ssl: ssl,
});

module.exports = pool;
