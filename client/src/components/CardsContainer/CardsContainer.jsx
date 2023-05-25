import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  //usamos useSelector para acceder a un estado (juegos) y lo guardamos en una variable
  const games = useSelector((state) => state.games);

  return (
    <div className={style.container}>
      {games.map((game) => {
        return (
          <Card
            id={game.id}
            name={game.name}
            image={game.image}
            platforms={game.platforms}
            releaseDate={game.releaseDate}
            rating={game.rating}
            genres={game.genres}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
