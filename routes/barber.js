const express = require("express");
const { verifyToken } = require("../middlewares/jwt-validate");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await db.query("select * from users");
    res.send({
        users: users.rows,
    });
});

router.post("/", async (req, res) => {
    const resBd = await db.query(
        "Insert into users(name, mail, password) values ($1, $2, $3)",
        [newUser.name, newUser.mail, newUser.password]
    );
});

module.exports = {
    router: router,
};

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const users = await db.query("select * from users where id = ${id}");

    res.send({
        users: users.rows,
    });
});