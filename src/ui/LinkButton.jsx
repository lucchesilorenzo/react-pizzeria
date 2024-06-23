import styles from "./LinkButton.module.css";

import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to)
    return (
      <Link className={styles.linkButton} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles.linkButton} onClick={() => navigate(-1)}>
      {children}
    </button>
  );
}

export default LinkButton;
