const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config;
const { API_KEY } = process.env;

const getVideogames = async (req, res) => {
  try {
    // Obtener videojuegos de la base de datos
    let videogames = await Videogame.findAll({
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

    // Mapear y transformar los videojuegos obtenidos de la base de datos
    videogames = videogames.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.image,
        description: game.description,
        platforms: game.platforms,
        releaseDate: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });

    // Construir las URLs de la API externa
    let urls = [];
    for (let i = 1; i <= 5; i++) {
      urls = [
        ...urls,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,
      ];
    }

    // Realizar solicitudes a la API externa
    let api = urls.map((e) => axios.get(e));
    api = await Promise.all(api);

    // Obtener los resultados de las solicitudes y transformar los videojuegos
    api = api?.map((e) => e.data.results).flat();
    api = api?.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        description: game.description,
        platforms: game.platforms.map((platform) => platform.platform.name),
        releaseDate: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });

    // Combinar los videojuegos de la base de datos y de la API externa
    const response = [...videogames, ...api];

    // Enviar la respuesta con la lista de videojuegos combinada
    res.status(200).send(response);
  } catch (error) {
    // Capturar y manejar cualquier error ocurrido
    res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
