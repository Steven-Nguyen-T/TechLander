const { Pool } = require("pg");
require("dotenv").config();

const PG_URI = process.env.elephantURI;
console.log("pguri", PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("query", text);
    return pool.query(text, params, callback);
  },
};
