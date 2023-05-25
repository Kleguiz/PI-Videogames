import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ pagina, setPagina, max }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPagina(parseInt(e.target.value)); // Actualiza el número de página con el valor del input
      if (
        parseInt(e.target.value < 1) || //si es menor a 1 que no siga bajando
        parseInt(e.target.value) > Math.ceil(max) || //si es mayor que no suba
        isNaN(parseInt(e.target.value)) // si no es valido
      ) {
        setPagina(1);
        setInput(1);
      } else {
        setPagina(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        {"<"}
      </button>
      <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p>de {max}</p>
      <button disabled={pagina === 7 || pagina > 7} onClick={nextPage}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
