const Yup = require("yup");

const schema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(8),
});
module.exports = schema;
