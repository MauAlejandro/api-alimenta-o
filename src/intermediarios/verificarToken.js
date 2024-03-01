const jwt = require("jsonwebtoken");
const senhaDoServidor = require("../jwt_key");
const pool = require("../conexao");

const verificarToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não permitido" });
  }
  
  const token = authorization.split(" ")[1];
  
  try {
    const { id } = jwt.verify(token, senhaDoServidor);
    
    const tokenValido = await pool.query(
      "select * from usuarios where id = $1",
      [id]
      );
      
      if (tokenValido.rowCount < 1) {
        return res.status(401).json({ message: "Não permitido" });
      }
      
      req.usuario = tokenValido.rows[0];
      
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = verificarToken
