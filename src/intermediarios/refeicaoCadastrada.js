const pool = require("../conexao");

const refeicaoCadastrada = async (req, res, next) => {
  const { refeicaoId } = req.params;
  const usuarioId = req.usuario.id;

  try {
    const verificar = await pool.query(
      "select * from refeicoes where id = $1 and usuario_id = $2",
      [refeicaoId, usuarioId]
    );

    if (verificar.rowCount < 1) {
        return res.status(404).json({message: "Não há refeicoes referentes ao id informado"})
    }

    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = refeicaoCadastrada
