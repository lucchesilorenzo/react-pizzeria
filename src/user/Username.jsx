import styles from "./Username.module.css";

import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return <div className={styles.username}>{username}</div>;
}

export default Username;
