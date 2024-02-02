const pool = require("../conexao");

const exibirAlimentos = async (req, res) => {
  try {
    const alimentosRegistrados = await pool.query(
      "select * from alimentos limit 10"
    );

    return res.json(alimentosRegistrados.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const cadastrarAlimento = async (req, res) => {
  const {
    nome,
    porcao,
    calorias,
    proteinas,
    carboidratos,
    gorduras,
    gorduras_saturadas,
  } = req.body;

  try {
    const cadastrar = await pool.query(
      `insert into alimentos (nome, porcao, calorias, proteinas, carboidratos, gorduras, gorduras_saturadas) 
    values ($1,$2,$3,$4,$5,$6,$7) returning *`,
      [
        nome,
        porcao,
        calorias,
        proteinas,
        carboidratos,
        gorduras,
        gorduras_saturadas,
      ]
    );

    return res.status(201).json(cadastrar.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const atualizarAlimento = (req, res) => {
  const {
    nome,
    porcao,
    calorias,
    proteinas,
    carboidratos,
    gorduras,
    gorduras_saturadas,
  } = req.body;

  if(!nome){
    return res.status(400).json({message: "nome é obrigatorio"})
  }

  

};
module.exports = { exibirAlimentos, cadastrarAlimento };
