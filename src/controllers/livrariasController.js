import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livrarias } from "../models/index.js";

class LivrariaController {
  static listarLivraria = async (req, res, next) => {
    try{
      const livrariaEncontradas = await livrarias.find()
        .populate("livro")
        .exec();
      res.status(200).json(livrariaEncontradas);
    } catch (err) {
      next(err);
    }
  };

  static listarLivrariaPorId = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livrariaEncontrada = await livrarias.findById(id)
        .populate("livro", "titulo")
        .exec();
      if(livrariaEncontrada !== null){
        res.status(200).send(livrariaEncontrada);
      } else {
        next(NaoEncontrado("ID de livraria não encontrada na busca."));
      }
    }catch(err){
      next(err);
    }
  };

  static cadastrarLivraria = async (req, res, next) => {
    try{
      const livraria = new livrarias(req.body);
      await livraria.save();
      res.status(201).send(livraria.toJSON());
    }catch (err) {
      next(err);
    }
  };

  static atualizarLivraria = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livrariaEncontrada = await livrarias.findByIdAndUpdate(id, {$set: req.body});
      if(livrariaEncontrada !== null){
        res.status(200).send({message: "Livraria atualizada com sucesso!"});
      } else {
        next(NaoEncontrado("ID de livraria não encontrada para atualização"));
      }
    } catch(err) {
      next(err);
    }
  };

  static deletarLivraria = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livrariaEncontrada = await livrarias.findByIdAndDelete(id);
      if(livrariaEncontrada !== null){
        res.status(200).send({ message : "Livraria removida com sucesso!"});
      } else {
        next(NaoEncontrado("ID de livraria não encontrada para remoção!"));
      }
    }catch(err){
      next(err);
    }
  };
}

export default LivrariaController;