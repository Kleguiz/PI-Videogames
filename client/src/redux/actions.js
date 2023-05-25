import axios from "axios";

//=========================================================================
export const GET_GAMES = "GET_GAMES";

export const getGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/videogames");
    const games = apiData.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};
//============================================================================
export const GET_GENRES = "GET_GENRES";

export const getGenres = () => {
  return async function (dispatch) {
    const apiDataGenres = await axios.get("http://localhost:3001/genres");
    const genres = apiDataGenres.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};
//============================================================================
export const FILTER = "FILTER";

export const filter = (payload) => {
  return async function (dispatch) {
    dispatch({ type: FILTER, payload: payload });
  };
};
//============================================================================
export const DELETE_FILTERS = "DELETE_FILTERS";

export const deleteFilters = () => {
  return async function (dispatch) {
    dispatch({ type: DELETE_FILTERS });
  };
};
//============================================================================
export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const orderByName = (payload) => {
  return async function (dispatch) {
    dispatch({ type: ORDER_BY_NAME, payload: payload });
  };
};
//============================================================================
export const ORDER_BY_RATING = "ORDER_BY_RATING";

export const orderByRating = (payload) => {
  return async function (dispatch) {
    dispatch({ type: ORDER_BY_RATING, payload: payload });
  };
};
//============================================================================
export const SEARCH_GAME = "SEARCH_GAME";

export const searchGame = (name) => {
  return async function (dispatch) {
    let games = await axios.get(
      `http://localhost:3001/videogames/name?name=${name}`
    );
    games = games.data;
    dispatch({
      type: SEARCH_GAME,
      payload: games,
    });
  };
};
//=============================================================================
export const RESET_GAMES = "RESET_GAMES";

export const resetGames = () => {
  return async function (dispatch) {
    dispatch({
      type: RESET_GAMES,
    });
  };
};
