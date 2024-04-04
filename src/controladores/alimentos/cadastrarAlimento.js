const pool = require("../conexao");


const cadastrarAlimento = async (req, res) => {
    const { nome, porcao, calorias, proteinas, carboidratos, gorduras } =
      req.body;
  
    try {
      const cadastrar = await pool.query(
        `insert into alimentos (nome, porcao, calorias, proteinas, carboidratos, gorduras) 
      values ($1,$2,$3,$4,$5,$6) returning *`,
        [nome, porcao, calorias, proteinas, carboidratos, gorduras]
      );
  
      return res.status(201).json(cadastrar.rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

module.exports = cadastrarAlimento