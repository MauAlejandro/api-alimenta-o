const bcrypt = require("bcrypt");
const pool = require("../conexao");
const jwt = require("jsonwebtoken");
const senhaDoServidor = require("../jwt_key");



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
      console.log(error);
      return res.status(500).json({ menssagem: error.message });
    }
  };

  module.exports = fazerLogin