import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O(A) autor(a) é obrigatório"]
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"]
    },
    n_paginas: {type: Number},
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;