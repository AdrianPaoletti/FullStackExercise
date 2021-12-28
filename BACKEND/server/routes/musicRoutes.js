const express = require("express");
const getArtistAlbums = require("../controllers/artistController");

const router = express.Router();

router.get("/artist", getArtistAlbums);

module.exports = router;
