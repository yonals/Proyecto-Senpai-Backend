const { text } = require("express");

const { Pool } = require("pg");

const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
};

// USAR ESTA CONFIGURACION EN CASO QUE NO FUNCIONE
//const config = {
//    user: "postgres",
//    host: "localhost",
//    password: "postgres",
//    database: "Barber",
//   port: 5432,
//};

const pool = new Pool(config);

module.exports = {
    query: (text, params) => pool.query(text, params),
};