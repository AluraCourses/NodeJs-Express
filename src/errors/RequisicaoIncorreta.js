import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(message = "Um ou mais dados fonecidos estão incorretos"){
    super(message, 400);
  }
}

export default RequisicaoIncorreta;