const express = require("express");


const ingredienteCadastrado = require("./intermediarios/ingredienteCadastrado");
const emailExistente = require("./intermediarios/emailExistente");
const verificarToken = require("./intermediarios/verificarToken");
const refeicaoCadastrada = require("./intermediarios/refeicaoCadastrada");
const validarCorpoReq = require("./intermediarios/validarCorpoReq");
const schemaUsuario = require("./schemas/schemaUsuarios");
const schemaLogin = require("./schemas/schemaLogin");
const schemaAtualizarRefeicao = require("./schemas/schemaAtualizarRefeicao");
const cadastrarUsuario = require("./controladores/usuario/cadastrarUsuario");
const fazerLogin = require("./controladores/usuario/login");
const exibirAlimentos = require("./controladores/alimentos/exibirAlimentos");
const cadastrarAlimento = require("./controladores/alimentos/cadastrarAlimento");
const atualizarAlimento = require("./controladores/alimentos/ataualizarAlimento");
const pesquisarAlimento = require("./controladores/alimentos/pesquisarAlimento");
const infoNutricionalRefeicao = require("./controladores/refeicao/infoNutriDaRefeicao");
const cadastrarRefeicao = require("./controladores/refeicao/cadastrarRefeicao");
const cadastrarRefeicaoDoDia = require("./controladores/refeicao/refeicaoDoDia");
const exibirRefeicoesDoDia = require("./controladores/refeicao/exibirREfeicoesDoDia");
const atualizarRefeicao = require("./controladores/refeicao/atualizarRefeicao");

const rotas = express();

rotas.post(
  "/usuario",
  validarCorpoReq(schemaUsuario),
  emailExistente,
  cadastrarUsuario
);
rotas.get("/login", validarCorpoReq(schemaLogin), fazerLogin);

rotas.use(verificarToken);

rotas.get("/alimentos", exibirAlimentos);
rotas.post("/alimentos", cadastrarAlimento);
rotas.put("/alimentos", atualizarAlimento);
rotas.get("/alimentos/:nome", pesquisarAlimento);

rotas.get("/refeicao/:id", infoNutricionalRefeicao);
rotas.post("/refeicao", ingredienteCadastrado, cadastrarRefeicao);
rotas.post("/refeicao/:refeicaoId", refeicaoCadastrada, cadastrarRefeicaoDoDia);
rotas.get("/refeicao", exibirRefeicoesDoDia);
rotas.put("/refeicao/:id", validarCorpoReq(schemaAtualizarRefeicao), atualizarRefeicao)

module.exports = rotas;
