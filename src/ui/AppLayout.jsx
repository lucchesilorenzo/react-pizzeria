import styles from "./AppLayout.module.css";

import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  return (
    <div className={styles.appLayout}>
      {isLoading && <Loader />}

      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
