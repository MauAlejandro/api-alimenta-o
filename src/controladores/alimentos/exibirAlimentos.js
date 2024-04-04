const pool = require("../conexao");


const exibirAlimentos = async (req, res) => {
    try {
      const alimentosRegistrados = await pool.query("select * from alimentos");
  
      return res.json(alimentosRegistrados.rows);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

module.exports = exibirAlimentos
  