import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Detail.module.css";
import axios from "axios";

const Detail = () => {
  // Obtener el parámetro 'id' de la URL utilizando useParams() de React Router
  const { id } = useParams();

  // Seleccionar una parte del estado de la aplicación almacenada en Redux
  const videogameid = useSelector((state) => state.videogameDetail);

  const num = videogameid?.rating;

  const [detail, setDetail] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((res) => setDetail(res.data));
  }, [id]);
  console.log(detail);

  return (
    <div className={style.card}>
      <div className={style.content}>
        <p className={style.name}>{detail?.name}</p>

        <p className={style.description}>{detail?.description}</p>

        <div className={style.info}>
          <div className={style.containerPlatforms}>
            {detail?.platforms?.map((platform) => (
              <p className={style.platform} key={platform}>
                {platform}
              </p>
            ))}
          </div>

          <div className={style.containerGenres}>
            {detail?.genres?.map((genre, i) => (
              <p className={style.genre} key={i}>
                {genre}
              </p>
            ))}
          </div>
        </div>

        <img className={style.image} src={detail?.image} alt="imagen" />

        <p className={style.released}>{detail?.releaseDate}</p>

        <p className={style.rating}>{detail?.rating}</p>
      </div>
    </div>
  );
};

export default Detail;
