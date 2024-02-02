const express = require("express");

const {
  exibirAlimentos,
  cadastrarAlimento,
} = require("./controladores/alimentos");

const {
  cadastrarRefeicao,
  infoNutricionalRefeicao,
} = require("./controladores/refeicao");

const { cadastrarUsuario } = require("./controladores/usuario");

const ingredienteCadastrado = require("./intermediarios/ingredienteCadastrado");

const rotas = express();

rotas.get("/alimentos", exibirAlimentos);
rotas.post("/alimentos", cadastrarAlimento);

rotas.get("/refeicao/:id", infoNutricionalRefeicao);
rotas.post("/refeicao", ingredienteCadastrado, cadastrarRefeicao);

rotas.post("/usuario", cadastrarUsuario)
module.exports = rotas;
