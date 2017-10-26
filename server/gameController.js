const express = require("express");
const activites = require("./gameObject");

const router = express.Router();

router
    .get("/exercises", (req, res) => res.send(activites.exercises))
    .get("/exercises_complete", (req, res) => res.send(activites.exercises_completed))

module.exports.router = router;