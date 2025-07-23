const express = require("express");
const router = express.Router();
const { generateContent } = require("../controllers/geminiController");

router.post("/", generateContent);

module.exports = router;
