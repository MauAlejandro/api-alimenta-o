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

const exibirRefeicoesDoDia = async (req, res) => {
  const { dia_da_refeicao } = req.query;
  const usuarioId = req.usuario.id;

  if (!dia_da_refeicao) {
    return res.status(400).json({message: "É necesario informar algun dia de refeição"})
  }

  try {
      let resultado 
      let objetoDoResultado = []

      for (let dia of dia_da_refeicao) {


        const idDasRefeicoes = await pool.query(
          "select * from refeicoes_do_dia where usuario_id = $1 and dia_da_refeicao ilike $2",
          [usuarioId, dia]
        );

        if (idDasRefeicoes.rowCount < 1) {
          objetoDoResultado.push({ dia_da_refeicao: dia , refeicoes: [] })
          console.log(objetoDoResultado);
          console.log("dia 1", dia);
        }else{

          for (let objeto of idDasRefeicoes.rows) {
  
            const refeicoes = await pool.query(
              "select * from refeicoes where id = $1",
              [objeto.refeicao_id]
            );
            objetoDoResultado.push({ dia_da_refeicao: dia , refeicoes: refeicoes.rows })
            console.log(objetoDoResultado);
            console.log("dia", dia);
          }
        }

     
        resultado = objetoDoResultado
      }
      return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cadastrarRefeicao,
  infoNutricionalRefeicao,
  cadastrarRefeicaoDoDia,
  exibirRefeicoesDoDia,
};
