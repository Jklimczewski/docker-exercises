const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/").get(async function(req, res) {
    let db_connect = dbo.getDb();
    const cursor = await db_connect.collection("users").find({})
    cursor.toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});
module.exports = recordRoutes;