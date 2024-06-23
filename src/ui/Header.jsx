import styles from "./Header.module.css";

import { Link } from "react-router-dom";

import SearchOrder from "../order/SearchOrder";
import Username from "../user/Username";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">React Pizzeria</Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
