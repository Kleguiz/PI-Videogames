const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

// Función asincrónica para obtener los géneros desde la API
const getGenresFromAPI = async () => {
  try {
    // Hacer una solicitud GET a la API utilizando axios y el API_KEY correspondiente
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    // Extraer los nombres de los géneros de la respuesta de la API
    const genres = response?.data?.results?.map((genre) => genre.name);
    return genres;
  } catch (error) {
    // Si ocurre un error, lanzar una nueva instancia del objeto Error con el mensaje del error
    throw new Error(error.message);
  }
};

// Función asincrónica para guardar los géneros en la base de datos
const saveGenresToDatabase = async (genres) => {
  try {
    // Crear modelos de género a partir de los nombres obtenidos
    const genreModels = genres?.map((genre) => {
      return { name: genre };
    });

    // Iterar sobre cada género y buscarlo en la base de datos o crearlo si no existe
    genreModels.forEach(async (genre) => {
      await Genre.findOrCreate({
        where: {
          name: genre.name,
        },
      });
    });
  } catch (error) {
    // Si ocurre un error, lanzar una nueva instancia del objeto Error con el mensaje del error
    throw new Error(error.message);
  }
};

// Función asincrónica para obtener y manejar los géneros
const getGenres = async (req, res) => {
  try {
    // Obtener los géneros desde la API
    let genresAPI = await getGenresFromAPI();

    // Guardar los géneros en la base de datos
    await saveGenresToDatabase(genresAPI);

    // Obtener todos los géneros desde la base de datos
    let genres = await Genre.findAll();

    // Extraer los nombres de los géneros
    const genresName = genres?.map((genre) => {
      return genre.name;
    });

    // Enviar los nombres de los géneros como respuesta en formato JSON
    res.json(genresName);
  } catch (error) {
    // Si ocurre un error, enviar una respuesta de error con el mensaje del error
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getGenres };
