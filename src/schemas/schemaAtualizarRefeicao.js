const joi = require("joi")

const schemaAtualizarRefeicao = joi.object({
    nome_refeicao: joi.string().required()
})


module.exports = schemaAtualizarRefeicao