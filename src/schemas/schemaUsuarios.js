const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().required(),
  email: joi.string().email(),
  senha: joi.string().min(5).required(),
});

module.exports = schemaUsuario;
