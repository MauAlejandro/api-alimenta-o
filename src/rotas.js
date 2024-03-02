const express = require("express");

const {
  exibirAlimentos,
  cadastrarAlimento,
  pesquisarAlimento,
  atualizarAlimento,
} = require("./controladores/alimentos");

const {
  cadastrarRefeicao,
  infoNutricionalRefeicao,
  cadastrarRefeicaoDoDia,
} = require("./controladores/refeicao");

const { cadastrarUsuario, fazerLogin } = require("./controladores/usuario");

const ingredienteCadastrado = require("./intermediarios/ingredienteCadastrado");
const emailExistente = require("./intermediarios/emailExistente");
const verificarToken = require("./intermediarios/verificarToken");
const refeicaoCadastrada = require("./intermediarios/refeicaoCadastrada");

const rotas = express();

rotas.post("/usuario", emailExistente, cadastrarUsuario);
rotas.get("/login", fazerLogin);

rotas.use(verificarToken);

rotas.get("/alimentos", exibirAlimentos);
rotas.post("/alimentos", cadastrarAlimento);
rotas.put("/alimentos", atualizarAlimento);
rotas.get("/alimentos/:nome", pesquisarAlimento);

rotas.get("/refeicao/:id", infoNutricionalRefeicao);
rotas.post("/refeicao", ingredienteCadastrado, cadastrarRefeicao);
rotas.post("/refeicao/:refeicaoId", refeicaoCadastrada, cadastrarRefeicaoDoDia)
module.exports = rotas;
