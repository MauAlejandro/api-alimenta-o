const pool = require("../conexao");



const cadastrarRefeicao = async (req, res) => {
    const { nome_refeicao, ingredientes } = req.body;
    const { id } = req.usuario;
  
    try {
      const valoresNutricionais = {
        calorias: 0,
        proteinas: 0,
        carboidratos: 0,
        gorduras: 0,
      };
  
      for (let ingrediente of ingredientes) {
        const { nome_alimento, quantidade } = ingrediente;
  
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
      }
  
      const cadastrarRefeicao = await pool.query(
        `
      insert into refeicoes 
      (nome_refeicao, calorias, proteinas, carboidratos, gorduras, usuario_id)
      values ($1, $2, $3, $4, $5, $6) returning id`,
        [
          nome_refeicao,
          valoresNutricionais.calorias,
          valoresNutricionais.proteinas,
          valoresNutricionais.carboidratos,
          valoresNutricionais.gorduras,
          id,
        ]
      );
  
      const idRefeicao = cadastrarRefeicao.rows[0].id;
      for (let ingrediente of ingredientes) {
        const cadastrar = await pool.query(
          `
          insert into ingredientes (refeicao_id, nome_alimento, quantidade)
          values ($1, $2, $3)`,
          [
            cadastrarRefeicao.rows[0].id,
            ingrediente.nome_alimento,
            ingrediente.quantidade,
          ]
        );
      }
  
      return res
        .status(200)
        .json(`refeicao (${nome_refeicao}) cadastrada com id ${idRefeicao} `);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = cadastrarRefeicao