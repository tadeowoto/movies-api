import { Router } from "express";
import { MovieController } from "../controllers/movies.mjs";

const MoviesRouter = Router();

MoviesRouter.get("/", MovieController.getMovies);

MoviesRouter.get("/top", MovieController.getMovieTop);

MoviesRouter.get("/:id", MovieController.getMovieById);

MoviesRouter.post("/", MovieController.createMovie);

MoviesRouter.patch("/:id", MovieController.updateMovie);

export default MoviesRouter ;
