import mongoose from "mongoose";

const livrariaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome da livraria é obrigatório"]
    },
    localizacao: {
      type: String,
      required: [true, "A localização da livraria deve ser informada"]
    },
    area:{
      type: Number,
    },
    livro:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "livros",
      required: [true, "O livro é obrigatório"]
    }

  },
  {
    versionKey: false
  }
);
  

const livrarias = mongoose.model("livraria", livrariaSchema);

export default livrarias;