const pool = require("../conexao")

const ingredienteCadastrado = async (req, res, next) => {
  const { ingredientes } = req.body;

  try {
    for (let ingrediente of ingredientes) {
      const ingredienteregistrado = await pool.query(
        "select * from alimentos where nome = $1",
        [ingrediente.nome_alimento]
        );
        
        if (ingredienteregistrado.rowCount < 1) {
          return res.status(404).json({ message: "ingrediente não cadastrado" });
        }
      }
      console.log("passei")
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error });
  }
};

module.exports = ingredienteCadastrado