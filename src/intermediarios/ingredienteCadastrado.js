const pool = require("../conexao");

const ingredienteCadastrado = async (req, res, next) => {
  const { ingredientes } = req.body;

  try {
    let ingredientesNaoCadastrados = [];
    for (let ingrediente of ingredientes) {
      const ingredienteregistrado = await pool.query(
        "select * from alimentos where nome = $1",
        [ingrediente.nome_alimento]
      );

      if (ingredienteregistrado.rowCount < 1) {
        if (ingredientesNaoCadastrados.length > 0) {
          const nome_alimento = " " + ingrediente.nome_alimento;
          ingredientesNaoCadastrados.push(nome_alimento);
        } else {
          ingredientesNaoCadastrados.push(ingrediente.nome_alimento);
        }
      }
    }

    if (ingredientesNaoCadastrados.length > 0) {
      return res.status(404).json({
        message: `ingrediente ${ingredientesNaoCadastrados} não cadastrado`,
      });
    }
    console.log("passei");
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = ingredienteCadastrado;
