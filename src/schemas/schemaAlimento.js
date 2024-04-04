const joi = require("joi");

const schemaAlimentos = joi.object({
  nome: joi.string().required(),
  porcao: joi.string(),
  calorias: joi.number().required(),
  proteinas: joi.number().required(),
  carboidratos: joi.number().required,
  gorduras: joi.number().required(),
});

module.exports = schemaAlimentos;
