const pool = require("../conexao");


const infoNutricionalRefeicao = async (req, res) => {
    const { id } = req.params;
  
    try {
      const exibirInfoNutricional = await pool.query(
        `select * from refeicoes 
            where id = $1`,
        [id]
      );
  
      if (exibirInfoNutricional.rowCount < 1) {
        return res
          .status(404)
          .json({ message: "Não há refeicoes cadastradas com o id informado" });
      }
  
      const { nome_refeicao, calorias, proteinas, carboidratos, gorduras } =
        exibirInfoNutricional.rows[0];
  
      return res.json({
        nome_refeicao,
        calorias,
        proteinas,
        carboidratos,
        gorduras,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = infoNutricionalRefeicao