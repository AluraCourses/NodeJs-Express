import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O(A) autor(a) é obrigatório"],
      autopopulate: true
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values:["Casa do código", "Alura"],
        message: "A editora {VALUE} fornecida não é um valor permitido"
      }
    },
    n_paginas: {
      type: Number,
      validate: {
        validator:(valor) => {
          return valor >= 10 && valor <= 5000;
        },

        message: "O valor {VALUE} deve estar entre 10 e 5000"
        
      }
    },
  }
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;