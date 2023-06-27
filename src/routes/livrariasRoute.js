import express from "express";
import LivrariaController from "../controllers/livrariasController.js";

const router = express.Router();

router
  .get("/livrarias", LivrariaController.listarLivraria)
  .get("/livrarias/:id", LivrariaController.listarLivrariaPorId)
  .post("/livrarias", LivrariaController.cadastrarLivraria)
  .put("/livrarias/:id", LivrariaController.atualizarLivraria)
  .delete("/livrarias/:id", LivrariaController.deletarLivraria);

export default router;