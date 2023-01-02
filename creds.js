const {Pool} = require('pg');

const pool = new Pool({
  host: "3380db.cs.uh.edu",
  user: "dbs023",
  password: "2131663D",
  database: "COSC3380",
  port: "5432",
});

module.exports = pool;