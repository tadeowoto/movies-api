import express from 'express';
import movies from './movies.json' assert { type: 'json' };
import crypto from 'node:crypto';
import { validateMovie , validatePartialMovie } from './schemas/movies.mjs';
import cors from 'cors';


const app = express();

app.use(cors());
app.disable('x-powered-by'); //estoy desactivando la cabecera de información del servidor express
app.use(express.json());

app.get('/', (req, res) => {
    res.json('welcome to movies API !');
});

app.get('/movies', (req, res) => {
    res.json(movies);
    const genre = req.query;
    if(genre){
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        return res.json(filteredMovies);
    }
});
app.get('/movies/top', (req, res) => {

    const mostPopularMovies = movies.sort((a, b) => b.rate - a.rate).slice(0, 3);
    if(mostPopularMovies){
        return res.json(mostPopularMovies);
    }else {
        return res.status(404).json({ message: 'Movies not found' });
    }

})

app.get('/movies/:id', (req, res) => {
    const id = req.params;

    const movie = movies.find(movie => movie.id === id);
    if(movie){
        return res.json(movie);
    }else{
        return res.status(404).json({ message: 'Movies not found' });
    }

});

app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);
    if(result.error){
        return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

 /*    const {
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    } = req.body; */ //estamos desestructurando el body de la petición que nos envia el cliente JSON esto seria equivalente a const title = req.body.title, const genre = req.body.genre, etc

    const newMovie = {
        id: crypto.randomUUID(), //genera un id aleatorio
        /* title,
        genre,
        year,
        director,
        duration,
        rate: rate || 0,
        poster */
        ...result.data
    } 

    movies.push(newMovie)
    res.status(201).json(newMovie);
});


app.patch('/movies/:id', (req, res) => {

    const result = validatePartialMovie(req.body);
    
    if(!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if(movieIndex === -1){
        return res.status(404).json({ message: 'Movies not found' });
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});