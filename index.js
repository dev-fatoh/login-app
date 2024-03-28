const express = require("express");

const app = express();

const db = require("./models");
const port = 3002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/", require("./routes/route"));
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
