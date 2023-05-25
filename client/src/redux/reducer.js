import {
  GET_GAMES,
  GET_GENRES,
  FILTER,
  DELETE_FILTERS,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SEARCH_GAME,
  RESET_GAMES,
} from "./actions";

const initialState = {
  games: [],
  genres: [],
  filtered: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      // Actualizar el arreglo de juegos y los juegos filtrados con los datos obtenidos de la action
      return { ...state, games: action.payload, filtered: action.payload };
    case GET_GENRES:
      // Actualizar el arreglo de géneros con los datos obtenidos de la action
      return { ...state, genres: action.payload };
    //========================================================================================================
    case FILTER:
      let gamesFiltered = state.games;
      if (action.payload.genres) {
        // Filtrar los juegos por género si se proporciona un género en la action
        gamesFiltered = gamesFiltered.filter((game) =>
          game.genres.includes(action.payload.genres)
        );
      }
      if (action.payload.apiODb) {
        if (action.payload.apiODb === "DB") {
          // Filtrar los juegos que contengan un guión en su ID si se especifica "DB" en la action
          gamesFiltered = gamesFiltered.filter((game) =>
            game.id.toString().includes("-")
          );
        } else {
          // Filtrar los juegos que no contengan un guión en su ID
          gamesFiltered = gamesFiltered.filter(
            (game) => !game.id.toString().includes("-")
          );
        }
      }
      // Actualizar los juegos filtrados con el resultado de los filtros aplicados
      return {
        ...state,
        filtered: gamesFiltered,
      };
    //========================================================================================================
    case DELETE_FILTERS:
      // Restablecer los juegos filtrados para que contengan todos los juegos del estado actual
      return {
        ...state,
        filtered: state.games,
      };
    //========================================================================================================
    case ORDER_BY_NAME:
      const byName =
        action.payload === "A-Z" // Si el valor de la action es "A-Z"
          ? state.filtered.sort((a, b) => {
              // Ordena el arreglo 'state.filtered' de forma ascendente
              if (a.name > b.name) return 1; //coloca 'a' después de 'b'
              if (a.name < b.name) return -1; //coloca 'a' antes del 'b'
              return 0;
            })
          : action.payload === "Z-A" // Si el valor de la action es "Z-A"
          ? state.filtered.sort((a, b) => {
              // Ordena el arreglo 'state.filtered' de forma descendente
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            })
          : [...state.games]; // Si no se especifica un orden, devuelve una copia del arreglo original 'state.games'
      return {
        ...state,
        filtered: byName, // Actualiza el arreglo 'filtered' del estado con el arreglo ordenado por nombre
      };
    //========================================================================================================
    case ORDER_BY_RATING:
      const byRating =
        action.payload === "min"
          ? // Ordenar los juegos por calificación en orden ascendente si se especifica "min" en la action
            state.filtered.sort((a, b) => a.rating - b.rating)
          : action.payload === "max"
          ? // Ordenar los juegos por calificación en orden descendente si se especifica "max" en la action
            state.filtered.sort((a, b) => b.rating - a.rating)
          : // Si no se especifica ningún orden, mantener el arreglo de juegos original
            [...state.games];
      // Actualizar los juegos filtrados con el resultado del ordenamiento por calificación
      return {
        ...state,
        filtered: byRating,
      };
    //========================================================================================================
    case SEARCH_GAME:
      return {
        ...state,
        filtered: action.payload,
      };
    //========================================================================================================
    case RESET_GAMES:
      return {
        ...state,
        filtered: state.games,
      };
    default:
      // Si la acción no coincide con ninguno de los casos anteriores, devolver el estado actual sin cambios
      return { ...state };
  }
};

export default rootReducer;
