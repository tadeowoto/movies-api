import z from 'zod';

 const movieSchema = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string'
    }
    ),
    genre: z.array(
        z.enum([ 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western', 'Animation', 'Crime' ]),
        {
            required_error: 'genre is required',
            invalid_type_error: 'genre must be an array of enum genre'
        }
    ),
    year: z.number().int().min(1900).max(2024),
    director: z.string({
        required_error: 'director is required',
        invalid_type_error: 'director must be a string'
    }),
    duration: z.number(),
    rate: z.number().min(0).max(10).default(0), //poner un 0 por defecto significa que puede ser nulo o vacio 
    poster: z.string().url({
        required_error: 'poster is required',
        invalid_type_error: 'poster must be an URL'
    })
});

function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input); //hace que todo sea opcional, pero si esta la valida
}


function validateMovie(input) {
    return movieSchema.safeParse(input);
}

export { validateMovie , validatePartialMovie };