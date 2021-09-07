const {findAllMovies,findOne, findShows} = require("../controllers/movie.controller");

const movieRouter = require("express").Router();
//const findAllMovies = require("../controllers/movie.controller");
//const app = require("../server");

movieRouter.get("/",findAllMovies);
movieRouter.get(`/:id`,findOne);
movieRouter.get("/:id/shows",findShows);



module.exports =  movieRouter;