const validator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      next(err);
    }
    next();
  };
};

module.exports = validator;
