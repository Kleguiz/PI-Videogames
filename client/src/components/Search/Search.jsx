import { useState } from "react";
import { searchGame } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./Search.module.css";

const Search = () => {
  // Definimos un estado llamado 'search' y una función 'setSearch' para modificar dicho estado
  const [search, setSearch] = useState();

  // Obtenemos la función 'dispatch' de Redux para poder enviar acciones al store
  const dispatch = useDispatch();

  //actualizamos el estado 'search' cuando el valor del input cambia
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    dispatch(searchGame(search));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={handleChange}
        className={styles.input}
        placeholder="Search Game"
      />
      <button onClick={handleClick}>search</button>
    </div>
  );
};

export default Search;
