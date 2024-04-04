const pool = require("../conexao");


const atualizarIngredienteDaRefeicao = async (req, res) => {
    const idDaRefeicao = req.params.id;
    const idDoIngrediente = req.params;
    const { quantidade } = req.body;
  
    try {
      const valorAtualDosMacros = await pool.query(
        "select quantidade from ingredientes where id = $1",
        [idDoIngrediente]
      );
  
      const atualizarIngrediente = await pool.query(
        "update ingredientes set quantidade = $1 where id = $2 and refeicao_id = $3 retuning quantidade",
        [quantidade, idDoIngrediente, idDaRefeicao]
      );
  
      const atualizarMacrosDaRefeicao = await pool.query("select ");
  
      const valoresNutricionais = {
        calorias: 0,
        proteinas: 0,
        carboidratos: 0,
        gorduras: 0,
      };
  
      const multiplicarValoresNutricionais = await pool.query(
        `
              select calorias * $1 as calorias, proteinas * $1 as proteinas, carboidratos * $1 as carboidratos,
              gorduras * $1 as gorduras 
              from alimentos where nome = $2;`,
        [quantidade, nome_alimento]
      );
      valoresNutricionais.calorias += Math.round(
        Number(multiplicarValoresNutricionais.rows[0].calorias)
      );
      valoresNutricionais.proteinas += Math.round(
        Number(multiplicarValoresNutricionais.rows[0].proteinas)
      );
      valoresNutricionais.carboidratos += Math.round(
        Number(multiplicarValoresNutricionais.rows[0].carboidratos)
      );
      valoresNutricionais.gorduras += Math.round(
        Number(multiplicarValoresNutricionais.rows[0].gorduras)
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };
