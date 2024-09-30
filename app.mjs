import express from "express";
import  cors  from "./middlewares/cors.mjs";
import MoviesRouter from "./routes/movies.mjs";

const app = express();


app.disable("x-powered-by"); //estoy desactivando la cabecera de información del servidor express
app.use(express.json());
app.use(cors);
app.get("/", (req, res) => {
  res.json("welcome to movies API !");
});

app.use("/movies", MoviesRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
