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
  const { senha, email } = req.body;

  try {
    const usuarioValido = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuarioValido.rowCount < 1) {
      return res.status(404).json({ message: "usuario ou senha invalidos" });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuarioValido.rows[0].senha
    );

    if (!senhaValida) {
      return res.status(404).json({ message: "usuario ou senha invalidos" });
    }

    const criarToken = jwt.sign(
      { id: usuarioValido.rows[0].id },
      senhaDoServidor,
      { expiresIn: "5h" }
    );

    return res
      .status(201)
      .json({ message: "usuario logado", token: criarToken });
  } catch (error) {}
};

module.exports = { cadastrarUsuario, fazerLogin };
