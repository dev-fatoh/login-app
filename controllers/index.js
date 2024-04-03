const db = require("../models");
const bcrypt = require("bcryptjs");
exports.signupPage = async (req, res) => {
  await res.render("index", {
    title: "Sign Up",
    message: req.flash(),
  });
};
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
    await db.User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    req.flash("error", error.errors[0].message);
    req.flash("path", error.errors[0].path);
    res.redirect("/");
  }
};
exports.loginPage = async (req, res) => {
  await res.render("login", {
    title: "Login",
    success: req.flash(),
  });
};

exports.validateUser = async (req, res) => {
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
    // res.status(200).json({
    //   msg: "welcome you logged in",
    // });
    req.flash("success", "welcome you logged in");
    res.redirect("/login");
  } catch (err) {
    res.status(400).json(err);
  }
};
