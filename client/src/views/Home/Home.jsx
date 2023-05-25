import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Home.module.css";
import Filters from "../../components/Filters/filters";

const Home = () => {
  const [update, setUpdate] = useState(true);

  const dispatch = useDispatch();

  const games = useSelector((state) => state.filtered);

  //queremos los juegos cuando el componente se monta
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);
  //======================PAGINATION=====================
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(15);

  let max = Math.ceil(games?.length / porPagina);

  return (
    <div className={style.container}>
      <div className={style.cards}>
        {games
          ?.slice(
            (pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
          )
          .map((game) => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
              />
            );
          })}
      </div>
      <div className={style.pagination}>
        <Pagination pagina={pagina} setPagina={setPagina} max={max} />
      </div>
      <div>
        <Filters update={update} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default Home;
