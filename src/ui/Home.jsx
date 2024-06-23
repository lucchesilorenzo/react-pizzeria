import styles from "./Home.module.css";

import { useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";

import CreateUser from "../user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector(getUsername);

  return (
    <div className={styles.home}>
      <h1>
        The best pizza.
        <br />
        <span>Straight out of the oven, straight to you.</span>
      </h1>

      {username !== "" ? (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
