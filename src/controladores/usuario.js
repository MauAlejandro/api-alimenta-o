const bcrypt = require("bcrypt");
const pool = require("../conexao");

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

module.exports = { cadastrarUsuario };
