import { movies } from "../data/movies.mjs" assert { type: "json" };
import crypto from 'node:crypto';

export class MovieModel {
  static async getAllMovies  ( {genre} ) {
    
    
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return res.json(filteredMovies);
    }
  }

  static async getMovieById( {id} ) {
    const movie = movies.find(movie => movie.id === id);
    return movie
  }

  static async getMovieTop( ) {
    const mostPopularMovies = movies.sort((a, b) => b.rate - a.rate).slice(0, 3);
    return mostPopularMovies
  }

  static async createMovie (input){
    const newMovie = {
        id: crypto.randomUUID(), //genera un id aleatorio
        /* title,
        genre,
        year,
        director,
        duration,
        rate: rate || 0,
        poster */
        ...input
    } 

    movies.push(newMovie)
    return newMovie;
  }

  static async updateMovie({id, input}){
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if(movieIndex === -1){
        return res.status(404).json({ message: 'Movies not found' });
    }
    const updatedMovie = {
        ...movies[movieIndex],
        ...input
    }
    return movies[movieIndex] = updatedMovie
  }
}   
