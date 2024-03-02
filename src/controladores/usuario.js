const bcrypt = require("bcrypt");
const pool = require("../conexao");
const jwt = require("jsonwebtoken");
const senhaDoServidor = require("../jwt_key");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const cadastrar = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
      [nome, email, senhaCriptografada]
    );

    const { id } = cadastrar.rows[0];
    return res.status(201).json({
      id,
      nome,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuarioExistente = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuarioExistente.rowCount < 1) {
      return res.status(400).json({ menssagem: "senha ou email invalidos" });
    }

    const senhaCriptografada = usuarioExistente.rows[0].senha;

    const senhaValida = await bcrypt.compare(senha, senhaCriptografada);

    if (!senhaValida) {
      return res.status(400).json({ menssagem: "senha ou email invalidos" });
    }

    const idUsuario = usuarioExistente.rows[0].id;

    const criarToken = jwt.sign({ id: idUsuario }, senhaDoServidor, {
      expiresIn: "5h",
    });

    req.usuario = { id: idUsuario };

    return res
      .status(200)
      .json({ menssagem: "logado", email, token: criarToken });
  } catch (error) {
    return res.status(500).json({ menssagem: error });
  }
};

const cadastrarDieta = (req, res) => {
  const {dias} = req.body
  
  try {
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ menssagem: error });
  }}

module.exports = { cadastrarUsuario, fazerLogin };
