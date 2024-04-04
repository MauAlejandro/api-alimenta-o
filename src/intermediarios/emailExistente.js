const pool = require("../controladores/conexao");

const emailExistente = async (req, res, next) => {
  const { email } = req.body;

  try {
    const verificarEmail = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (verificarEmail.rowCount > 0) {
      return res
        .status(401)
        .json({ message: "já existe usuario com este email" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = emailExistente;
