const express = require("express");
const path = require("path");
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

app.use("/", require("./routes/route"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
