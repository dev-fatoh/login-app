const express = require("express");

const router = express.Router();
const { getUsers, createUser, login } = require("../controllers/index.js");
router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);

module.exports = router;
