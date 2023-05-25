import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  // Obtenemos los géneros del estado global usando useSelector
  const genres = useSelector((state) => state.genres);
  const platforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox One",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynux",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "Web",
  ];

  // Obtenemos los géneros del servidor cuando el componente se monta por primera vez
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [form, setForm] = useState({
    Name: "",
    Image: "",
    Description: "",
    Platforms: [],
    Released: "",
    Rating: "",
    Genres: [],
  });

  //validacion del input name y rating
  const validate = (form) => {
    let errors = {};

    if (form.Name.length < 2) {
      errors.name = "error name";
    }

    if (Number.isNaN(Number(form.Rating))) {
      errors.rating = "error rating - not a number";
    } else if (Number(form.Rating) < 1 || Number(form.Rating) > 10) {
      errors.rating = "error rating - invalid range";
    }

    return errors;
  };

  //validamos el form
  const errorsMsg = validate(form);

  // Manejador de cambio de valores en los campos de entrada del formulario
  const changeHandler = (event) => {
    //almacena el valor del atributo name
    const property = event.target.name;
    //almacena el valor del campo que cambio
    const value = event.target.value;

    //actualizamos el estado
    setForm({ ...form, [property]: value });
  };

  const changeHandlerP = (event) => {
    const value = event.target.value;

    if (value !== "Platforms" && !form.Platforms.includes(value)) {
      //actualizamos el estado
      setForm({ ...form, Platforms: [...form.Platforms, value] });
    }
  };

  const changeHandlerG = (event) => {
    const value = event.target.value;

    if (value !== "Genres" && !form.Genres.includes(value)) {
      setForm({ ...form, Genres: [...form.Genres, value] });
    }
  };

  const submitHandler = async (event) => {
    //evita que se recargue la pagina al enviar el form
    event.preventDefault();
    if (Object.values(errorsMsg).length) {
      return alert(Object.values(errorsMsg).join("\n"));
    }
    try {
      await axios.post("http://localhost:3001/videogames", form);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleDeleteP(event) {
    event.preventDefault();
    setForm({
      ...form,
      Platforms: form.Platforms.filter((e) => e !== event.target.value),
    });
  }

  function handleDeleteG(event) {
    event.preventDefault();
    setForm({
      ...form,
      Genres: form.Genres.filter((e) => e !== event.target.value),
    });
  }

  return (
    <form className={`${styles.neomorphismForm}`} onSubmit={submitHandler}>
      <div className={`${styles.neomorphismGroup}`}>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          className={`${styles.neomorphismInput}`}
          onChange={changeHandler}
          name="Name"
        />
        <p className={`${styles.errorMessage}`}>{errorsMsg.name}</p>
      </div>

      <div className={`${styles.neomorphismGroup}`}>
        <label>Image:</label>
        <input
          type="text"
          className={`${styles.neomorphismInput}`}
          onChange={changeHandler}
          name="Image"
        />
      </div>

      <div className={`${styles.neomorphismGroup}`}>
        <label>Description:</label>
        <input
          type="text"
          className={`${styles.neomorphismInput}`}
          onChange={changeHandler}
          name="Description"
        />
      </div>

      <div className={`${styles.neomorphismGroup}`}>
        <label>Released:</label>
        <input
          type="text"
          className={`${styles.neomorphismInput}`}
          onChange={changeHandler}
          name="Released"
        />
      </div>

      <div className={`${styles.neomorphismGroup}`}>
        <label>Rating:</label>
        <input
          type="text"
          className={`${styles.neomorphismInput}`}
          onChange={changeHandler}
          name="Rating"
        />
        <p className={`${styles.errorMessage}`}>{errorsMsg.rating}</p>
      </div>

      <select
        name="Genres"
        className={`${styles.neomorphismSelect}`}
        onChange={changeHandlerG}
      >
        <option value="Genres">Genres</option>
        {genres?.map((genre, i) => {
          return <option key={i}>{genre}</option>;
        })}
      </select>

      <div className={`${styles.neomorphismTags}`}>
        {form.Genres?.map((e, i) => {
          return (
            <span key={i}>
              {e}
              <button value={e} onClick={handleDeleteG}>
                X
              </button>
            </span>
          );
        })}
      </div>

      <select
        name="Platforms"
        className={`${styles.neomorphismSelect}`}
        onChange={changeHandlerP}
      >
        <option value="Platforms">Platforms</option>
        {platforms?.map((platform, i) => {
          return <option key={i}>{platform}</option>;
        })}
      </select>

      <div className={`${styles.neomorphismTags}`}>
        {form.Platforms?.map((e, i) => {
          return (
            <span key={i}>
              {e}
              <button value={e} onClick={handleDeleteP}>
                X
              </button>
            </span>
          );
        })}
      </div>

      <button type="submit" className={`${styles.neomorphismButton}`}>
        Crear Videojuego
      </button>
    </form>
  );
};

export default Form;
