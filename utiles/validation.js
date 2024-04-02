exports.validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    return next();
  } catch (error) {
    res.status(500).json({
      type: error.name,
      message: error.message,
    });
  }
};
