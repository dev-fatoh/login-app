const db = require("../models");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({
        msg: "wrong email..",
      });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(404).json({
        msg: "wrong password ...",
      });
      return;
    }
    res.status(200).json({
      msg: "welcome you logged in",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
