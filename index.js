const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

const db = require("./models");
const port = 3002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
);
app.use(flash());
app.use("/", require("./routes/route"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
