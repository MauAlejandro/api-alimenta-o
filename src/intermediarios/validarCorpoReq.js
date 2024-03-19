const joi = require("joi");

const validarCorpoReq = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validarCorpoReq;
