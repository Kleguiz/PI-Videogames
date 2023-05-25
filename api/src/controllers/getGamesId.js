const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getVideogamesById = async (id, source) => {
  let gameData;

  //Si source entró a "api" buscar en la API
  if (source === "api") {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const {
      name,
      description_raw,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = response.data;

    //Construimos el obj gameData con los campos que necesitamos
    gameData = {
      name,
      description: description_raw,
      platforms: platforms.map((platform) => platform.platform.name),
      image: background_image,
      released: released,
      rating,
      genres: genres.map((e) => e.name),
    };
  } else {
    //Si source no entró a la API entonces que busque en la bdd
    gameData = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }
  //Construir el objeto game con los campos relevantes de gameData
  let game = {
    id: gameData.id,
    name: gameData.name,
    image: gameData.image,
    description: gameData.description,
    platforms: gameData.platforms,
    releaseDate: gameData.released,
    rating: gameData.rating,
    genres: gameData.genres.map((genre) => genre.name),
  };
  return game;
};
const getGamesId = async (req, res) => {
  const { id } = req.params;

  //"bdd" si id no es un número y "api" si lo es
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const gameData = await getVideogamesById(id, source);
    res.status(200).json(gameData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGamesId, getVideogamesById };
