var express = require('express');
var pg = require("pg");
var router = express.Router();
const config = {
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "Barber",
    port: 5432,
};