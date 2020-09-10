const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.elephantURI,
});

module.exports = {
  query: (text: string, params: any, callback: Function) => {
    console.log("query", text);
    return pool.query(text, params, callback);
  },
};
