const express = require("express");

const {
  exibirAlimentos,
  cadastrarAlimento,
} = require("./controladores/alimentos");

const {
  cadastrarRefeicao,
  infoNutricionalRefeicao,
} = require("./controladores/refeicao");

const { cadastrarUsuario, fazerLogin } = require("./controladores/usuario");

const ingredienteCadastrado = require("./intermediarios/ingredienteCadastrado");
const emailExistente = require("./intermediarios/emailExistente");
const verificarToken = require("./intermediarios/verificarToken");

const rotas = express();

rotas.post("/usuario", emailExistente, cadastrarUsuario)
rotas.get("/login", fazerLogin)

rotas.use(verificarToken)

rotas.get("/alimentos", exibirAlimentos);
rotas.post("/alimentos", cadastrarAlimento);

rotas.get("/refeicao/:id", infoNutricionalRefeicao);
rotas.post("/refeicao", ingredienteCadastrado, cadastrarRefeicao);
module.exports = rotas;
