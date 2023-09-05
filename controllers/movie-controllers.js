import jwt from "jsonwebtoken";
import Movie from "../models/Movie";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(400).json({ message: "Token Not Found" });
  }
  let adminId;

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  const { title, description, releaseDate, poster_URL, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !poster_URL &&
    poster_URL.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate,
      featured,
      admin: adminId,
      releaseDate: new Date(`${releaseDate}`),
      actors,
      poster_URL,
    });
    movie = await movie.save();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(201).json({ movie });
};
export const getAllMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }
  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(200).json({ movies });
};
export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie Not Found" });
  }

  return res.status(200).json({ movie });
};
