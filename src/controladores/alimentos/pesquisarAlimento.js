const instanciaAxios = require("../api");
const apiKey = require("../apiKey");


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

module.exports = pesquisarAlimento