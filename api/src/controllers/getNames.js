const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

//FN async que obtiene todos los juegos
const getAllGames = async () => {
  //Consulta a la bdd para obtener todos los juegos
  const dbGames = await Videogame.findAll();
  return dbGames;
};

//FN async que busca un juego por nombre en la bdd y api
const searchGameByName = async (name) => {
  //Consulta a la bdd para buscar juegos que coincidan con el nombre pasado por query
  const dbGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    limit: 15,
  });

  const apiGamesResponse = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );

  //Mapear y formatear los juegos obtenidos por la API
  const apiGames = apiGamesResponse.data.results.slice(0, 15).map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    description: game.description,
    platforms: game.platforms.map((platform) => platform.platform.name),
    releaseDate: game.released,
    rating: game.rating,
    genres: game.genres.map((genre) => genre.name),
  }));

  return [...dbGames, ...apiGames];
};

const getNames = async (req, res) => {
  const { name } = req.query;

  try {
    //Si se proporcionó un nombre, realizar la busqueda
    const results = name ? await searchGameByName(name) : await getAllGames();

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron videojuegos." });
    }

    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocurrió un error al buscar los videojuegos." });
  }
};

module.exports = { getNames, searchGameByName, getAllGames };
