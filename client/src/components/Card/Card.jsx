import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, image, genres, id }) => {
  return (
    <Link to={`/detail/${id}`} className={style.link}>
      <div className={`${style.card} ${style.styles}`}>
        <div className={style.containerImage}>
          <img src={image} alt={name} className={style.image} />
        </div>
        <p className={style.name}>{name}</p>
        <div className={style.containerGenre}>
          {genres?.map((e) => {
            return <p className={style.genre}>{e}</p>;
          })}
        </div>
      </div>
    </Link>
  );
};

export default Card;
