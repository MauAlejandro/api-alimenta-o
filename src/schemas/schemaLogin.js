const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});

module.exports = schemaLogin;
