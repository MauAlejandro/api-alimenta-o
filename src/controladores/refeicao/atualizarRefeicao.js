const pool = require("../conexao");

  const atualizarRefeicao = async (req, res) => {
    const idDaRefeicao = req.params.id;
    const { nome_refeicao } = req.body;
  
    try {
      let atualizaeNome;
      if (nome_refeicao) {
        atualizaeNome = await pool.query(
          "UPDATE refeicoes SET nome_refeicao = $1 WHERE id = $2 returning *",
          [nome_refeicao, idDaRefeicao]
        );
      }
  
      return res.status(200).json(atualizaeNome.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = atualizarRefeicao