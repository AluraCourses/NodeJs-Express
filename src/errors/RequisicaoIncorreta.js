import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensage = "Um ou mais dados fonecidos estão incorretos"){
    super(mensage, 400);
  }
}

export default RequisicaoIncorreta;