
import mysql from 'mysql2/promise';

const config = { // configuración de la base de datos
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviesdb',
    port: 3306
}

const connection = await mysql.createConnection(config);


export default class movieModel {

    static async getAllMovies( {genre} ) {
        const [movies] = await connection.query('SELECT * FROM movie');
        return movies;
    }

    static async getMovieById( {id} ) {

    }

    static async getMovieTop( ) {

    }

    static async createMovie (input) {

    }

    static async updateMovie({id, input}) {

    }



}