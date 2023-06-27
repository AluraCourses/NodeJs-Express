import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  //LISTAGEM COM PAGINAÇÃO PASSANDO LIMITE E PAGINA CASO INFORMADO
  //LISTAGEM COM ORDENAÇÃO PASSANDO NO PADRÃO "ATRIBUTO:1" OU "ATRIBUTO:-1"
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();    
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosEncontrados = livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosEncontrados;

        next();    
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
      const livroEncontrado = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(livroEncontrado !== null){
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
