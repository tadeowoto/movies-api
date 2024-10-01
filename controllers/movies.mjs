//import  MovieModel  from "../models/movie.mjs";
import  MovieModel  from "../models/mysql/mysql/movie.mjs";
import { validateMovie, validatePartialMovie } from "../schemas/movies.mjs";


export class MovieController {
    static async getMovies(req, res) {
        try {
            const { genre } = req.query;
            const movies = await MovieModel.getAllMovies({ genre });
            res.json(movies);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    static async getMovieById(req, res) {
        try {
            const id = req.params;
            const movie = await MovieModel.getMovieById(id);
            if (movie) {
              return res.json(movie);
            } else {
              return res.status(404).json({ message: "Movies not found" });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
          
    }

    static async getMovieTop(req, res) {
        try {
            const topMovies = await MovieModel.getMovieTop();
            if (topMovies) {
              return res.json(topMovies);
            } else {
              return res.status(404).json({ message: "Movies not found" });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    static async createMovie(req, res) {
        try {
            const result = validateMovie(req.body);
            if (result.error) {
              return res.status(422).json({ error: JSON.parse(result.error.message) });
            }
        
            const newMovie = await MovieModel.createMovie(result.data);
            /*    const {
                      title,
                      genre,
                      year,
                      director,
                      duration,
                      rate,
                      poster
                  } = req.body; */ //estamos desestructurando el body de la petición que nos envia el cliente JSON esto seria equivalente a const title = req.body.title, const genre = req.body.genre, etc
        
            res.status(201).json(newMovie);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    static async updateMovie(req, res) {
        try {
            const result = validatePartialMovie(req.body);
            if (result.error) {
              return res.status(422).json({ error: JSON.parse(result.error.message) });
            }
        
            const { id } = req.params;
            const updatedMovie = await MovieModel.updateMovie({ id, ...result.data });
            res.json(updatedMovie);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
          
    }


}