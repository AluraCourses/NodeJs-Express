import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarautores = async (req, res) => {
    try {
      const autoresEncontrados = await autores.find().exec();
      res.status(200).json(autoresEncontrados);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao buscar autores" });
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autorEncontrado = await autores.findById(id);
  
      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id de Autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autoresEncontrado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(autoresEncontrado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso!"});
      } else {
        next(new NaoEncontrado("ID de autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autoresEncontrado = await autores.findByIdAndDelete(id);
      if (autoresEncontrado !== null){
        res.status(200).send({ message: "Autor removido com sucesso."});
      } else {
        next(new NaoEncontrado("ID de autor não encontrado"));
      }      
    } catch (err) {
      next(err);
    }
  };

    
}

export default AutorController;
