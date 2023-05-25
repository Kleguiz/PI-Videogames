import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  filter,
  deleteFilters,
  orderByName,
  orderByRating,
} from "../../redux/actions";

import style from "./filters.module.css";

const Filters = ({ update, setUpdate }) => {
  const dispatch = useDispatch(); // Obtiene una instancia de dispatch
  const genres = useSelector((state) => state.genres); // Obtiene el estado 'genres' del almacenamiento de Redux

  const [filters, setFilters] = useState({
    // Define el estado local 'filters' utilizando useState
    genres: "",
    apiODb: "",
  });

  useEffect(() => {
    if (!genres.length) {
      // Si el estado 'genres' está vacío, obtiene los géneros utilizando la action 'getGenres'
      dispatch(getGenres());
    }
    dispatch(filter(filters)); // Aplica los filtros utilizando la acción 'filter' cada vez que 'filters' cambie
  }, [dispatch, filters]);

  const handleChange = (e) => {
    if (e.target.value === "genres") {
      // Si se selecciona el filtro 'genres', establece su valor en null
      setFilters({
        ...filters,
        genres: null,
      });
    } else if (e.target.value === "apiODb") {
      // Si se selecciona el filtro 'apiODb', establece su valor en null
      setFilters({
        ...filters,
        apiODb: null,
      });
    } else {
      setFilters({
        //actuliza filters segun los campos seleccionados
        ...filters,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDelete = (e) => {
    dispatch(deleteFilters()); // Elimina los filtros existentes utilizando la action 'deleteFilters'
    document.getElementById("1").selected = "selected";
    document.getElementById("2").selected = "selected";
    setUpdate(!update); // Actualiza el estado 'update' para refrescar el componente
  };

  const handlerOrderByName = (e) => {
    dispatch(orderByName(e.target.value)); // Ordena los elementos según el criterio seleccionado utilizando la acción 'orderByName'
    setUpdate(!update);
  };

  const handlerOrderByRating = (e) => {
    dispatch(orderByRating(e.target.value)); // Ordena los elementos según el criterio seleccionado utilizando la acción 'orderByRating'
    setUpdate(!update);
  };

  return (
    <div className={style.container}>
      <div>
        <h1>FILTROS</h1>
      </div>
      <div className={style.select}>
        <div>
          <div className={style.filters}>
            <h2>Genres</h2>
            <select name="genres" onChange={handleChange}>
              <option value={"genres"} id="1">
                ...
              </option>
              {genres?.map((genre) => {
                // Mapea los géneros obtenidos del estado 'genres' para generar opciones
                return <option>{genre}</option>;
              })}
            </select>
            <h2>API</h2>
            <select name="apiODb" onChange={handleChange}>
              <option value={"apiODb"} id="2">
                ...
              </option>
              <option>API</option>
              <option>DB</option>
            </select>
          </div>
        </div>
        <div className={style.ordenamientos}>
          <h2>order by name</h2>
          <select name="name" onChange={handlerOrderByName}>
            <option value={"A-Z"}>A-Z</option>
            <option value={"Z-A"}>Z-A</option>
          </select>
          <h2>order by rating</h2>
          <select name="rating" onChange={handlerOrderByRating}>
            <option value={"min"}>{"menor a mayor"}</option>
            <option value={"max"}>{"mayor a menor"}</option>
          </select>
        </div>
      </div>
      <div className={style.divButton}>
        <button onClick={handleDelete} className={style.button}>
          delete filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
