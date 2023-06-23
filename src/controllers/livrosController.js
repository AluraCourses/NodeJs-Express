import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosEncontrados = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosEncontrados);
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {

      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosEncontrados = await livros
          .find(busca)
          .populate("autor");

        res.status(200).json(livrosEncontrados);
      } else {
        res.status(200).send([]);
      }

      
    } catch (err) {
      next(err);
    }
  };    

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      if (livroEncontrado !== null) {
        res.status(200).send(livroEncontrado);
      } else {
        next(new NaoEncontrado("ID de livro não encontrado na busca."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosEncontrados = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(livrosEncontrados !== null){
        res.status(200).send({message: "Livro atualizado com sucesso!"});
      } else {
        next(new NaoEncontrado("ID de livro não encontrado para alteração."));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroEncontrado = await livros.findByIdAndDelete(id);
      if(livroEncontrado !== null){
        res.status(200).send({ message: "Livro removido com sucesso."});
      } else {
        next(new NaoEncontrado("ID de livro não econtrado para exclusão."));
      }
    } catch (err) {
      next(err);
    }
  };
}

async function processaBusca(params) {
  const { editora , titulo , minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo =  { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.n_paginas = {};

  // GTE - Greater Than or Equal
  if (minPaginas) busca.n_paginas.$gte = minPaginas;
  
  // LTE - Less Than or Equal
  if (maxPaginas) busca.n_paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor});

    if (autor !== null){
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
