const { Router } = require("express");

const postVideogame = require("../controllers/postGames");
const getGames = require("../controllers/getGames");
const { getGamesId } = require("../controllers/getGamesId");
const { getNames } = require("../controllers/getNames");

const router = Router();

router.get("/", getGames);
router.get("/name", getNames);
router.get("/:id", getGamesId);
router.post("/", postVideogame);

module.exports = router;
