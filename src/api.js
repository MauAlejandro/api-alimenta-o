const axios = require("axios");
const apiKey = require("./apiKey");

const instanciaAxios = axios.create({
  baseURL: "https://api.spoonacular.com",
});

module.exports = instanciaAxios;
