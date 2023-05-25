const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoutes = require("./videogames.routes");
const genresRoutes = require("./genres.routes.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();
router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes);

module.exports = router;
