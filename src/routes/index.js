import express from "express";
import livros from "./livrosRoute.js";
import autores from "./autoresRoute.js";
import livrarias from "./livrariasRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Curso de NodeJS");
  });

  app.use(
    express.json(),
    livros,
    autores,
    livrarias
  );
};

export default routes;