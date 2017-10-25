const express = require("express");
const game = require("./gameObject");

const router = express.Router();

router
    .get("/pictures", (req, res) => res.send(game.pictures))
    .get("/quotes", (req, res) => res.send(game.quotes))
    .get("/exercises", (req, res) => res.send(game.exercises))

module.exports.router = router;