const instanciaAxios = require("../api");
const apiKey = require("../apiKey");
const pool = require("../conexao");

const exibirAlimentos = async (req, res) => {
  try {
    const alimentosRegistrados = await pool.query("select * from alimentos");

    return res.json(alimentosRegistrados.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

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

const pesquisarAlimento = async (req, res) => {
  const { nome } = req.params;

  try {
    const alimentoApi = await instanciaAxios.get(
      `/food/ingredients/search?query=${nome}&apiKey=${apiKey}`
    );

    if (alimentoApi.data.results.length < 1) {
      return res
        .status(404)
        .json({ message: "Não há resultados na api com esse nome" });
    }

    const idDoAlimentoApi = alimentoApi.data.results[0].id;

    const infoDoAlimentoApi = await instanciaAxios.get(
      `https://api.spoonacular.com/food/ingredients/${idDoAlimentoApi}/information?amount=1&unit=grams&apiKey=${apiKey}`
    );

    const arreyDeinfo = infoDoAlimentoApi.data.nutrition.nutrients;

    const resultado = {
      nome,
      nome_api: alimentoApi.data.results[0].name,
      porcao: "1g",
      calorias: "",
      proteinas: "",
      carboidratos: "",
      gorduras: "",
    };

    for (let objeto of arreyDeinfo) {
      if (objeto.name === "Protein") {
        resultado.proteinas = objeto.amount;
      }
      if (objeto.name === "Calories") {
        resultado.calorias = objeto.amount;
      }
      if (objeto.name === "Carbohydrates") {
        resultado.carboidratos = objeto.amount;
      }
      if (objeto.name === "Fat") {
        resultado.gorduras = objeto.amount;
      }
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  exibirAlimentos,
  cadastrarAlimento,
  atualizarAlimento,
  pesquisarAlimento,
};
