import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res);
  } else if (error instanceof ErroBase) {
    error.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;