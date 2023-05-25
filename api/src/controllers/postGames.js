const { Videogame, Genre } = require("../db");

const postVideogame = async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { Name, Description, Platforms, Image, Released, Rating, Genres } =
    req.body;

  try {
    // Buscar los géneros en la base de datos
    const foundGenres = await Genre.findAll({
      where: {
        name: Genres,
      },
    });

    // Crear un nuevo videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name: Name,
      description: Description,
      platforms: Platforms,
      image: Image,
      released: Released,
      rating: Number(Rating),
    });

    // Asociar los géneros encontrados con el nuevo videojuego
    await newVideogame.addGenre(foundGenres);

    // Enviar una respuesta con el nuevo videojuego creado
    res.json(newVideogame);
  } catch (error) {
    // En caso de error, enviar una respuesta con un estado de error y un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postVideogame;
