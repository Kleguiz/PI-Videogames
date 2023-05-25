import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="wp12257872.jpg" alt="" />
      <Link to="/home">
        <button className={styles.boton}>PRESS START</button>
      </Link>
    </div>
  );
};

export default Landing;
