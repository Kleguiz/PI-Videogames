import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Search from "../Search/Search";
import { resetGames } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetGames());
  };

  return (
    <div
      className={`${style.mainContainer} ${style.neomorphism} ${style.container}`}
    >
      <div>
        <Link to="/home" className={style.navLink} onClick={handleClick}>
          HOME
        </Link>
        <Link to="/create" className={style.navLink}>
          CREATE GAME
        </Link>
      </div>
      <Search />
    </div>
  );
};

export default NavBar;
