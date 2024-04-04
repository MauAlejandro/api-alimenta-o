const pool = require("../conexao");

const exibirRefeicoesDoDia = async (req, res) => {
  const { dia_da_refeicao } = req.query;
  const usuarioId = req.usuario.id;

  if (!dia_da_refeicao) {
    return res
      .status(400)
      .json({ message: "É necesario informar algun dia de refeição" });
  }

  try {
    let resultado;
    let objetoDoResultado = [];

    for (let dia of dia_da_refeicao) {
      const idDasRefeicoes = await pool.query(
        "select * from refeicoes_do_dia where usuario_id = $1 and dia_da_refeicao ilike $2",
        [usuarioId, dia]
      );

      if (idDasRefeicoes.rowCount < 1) {
        objetoDoResultado.push({ dia_da_refeicao: dia, refeicoes: [] });
      } else {
        for (let objeto of idDasRefeicoes.rows) {
          const refeicoes = await pool.query(
            "select * from refeicoes where id = $1",
            [objeto.refeicao_id]
          );

          let mesmoDia = false;
          let indiceAtual = objetoDoResultado.length - 1;

          if (objetoDoResultado.length > 0) {
            objetoDoResultado[indiceAtual].dia_da_refeicao == dia
              ? (mesmoDia = true)
              : (mesmoDia = false);
          }

          if (mesmoDia) {
            objetoDoResultado[indiceAtual].refeicoes.push(refeicoes.rows[0]);
          } else {
            objetoDoResultado.push({
              dia_da_refeicao: dia,
              refeicoes: [refeicoes.rows[0]],
            });
          }
        }
      }

      resultado = objetoDoResultado;
    }
    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = exibirRefeicoesDoDia