const pool = require("../conexao");

const cadastrarRefeicaoDoDia = async (req, res) => {
    const { dia_da_refeicao } = req.query;
    const usuarioId = req.usuario.id;
    const { refeicaoId } = req.params;
    console.log(usuarioId);
  
    try {
      await pool.query(
        `insert into refeicoes_do_dia (usuario_id, refeicao_id, dia_da_refeicao) values ($1, $2, $3) returning *`,
        [usuarioId, refeicaoId, dia_da_refeicao]
      );
  
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = cadastrarRefeicaoDoDia