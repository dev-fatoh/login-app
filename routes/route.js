const express = require("express");

const router = express.Router();
const {
  signupPage,
  getUsers,
  createUser,
  validateUser,
  loginPage,
} = require("../controllers/index.js");

router.get("/", signupPage);
router.get("/login", loginPage);
router.get("/users", getUsers);
router.post("/", createUser);
router.post("/login", validateUser);

module.exports = router;
