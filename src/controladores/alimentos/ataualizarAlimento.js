const pool = require("../conexao");

const atualizarAlimento = async (req, res) => {
    const { nome, porcao, calorias, proteinas, carboidratos, gorduras } =
      req.body;
  
    if (!nome) {
      return res.status(400).json({ message: "nome é obrigatorio" });
    }
    if (!calorias) {
      return res.status(400).json({ message: "calorias é obrigatorio" });
    }
    if (!proteinas) {
      return res.status(400).json({ message: "proteinas é obrigatorio" });
    }
    if (!carboidratos) {
      return res.status(400).json({ message: "carboidratos é obrigatorio" });
    }
  
    try {
      const atualizar = await pool.query(
        "update alimentos set nome = $1, porcao = $2, calorias = $3, proteinas = $4, carboidratos = $5, gorduras = $6 where nome ilike $1 returning *",
        [nome, porcao, calorias, proteinas, carboidratos, gorduras]
      );
  
      return res.status(200).json(atualizar.rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };
  

module.exports = atualizarAlimento