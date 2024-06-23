import styles from "./CartOverview.module.css";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalQuantity) return;

  return (
    <div className={styles.cartOverview}>
      <p>
        {totalQuantity} {totalQuantity === 1 ? "pizza" : "pizzas"}{" "}
        {formatCurrency(totalPrice)}
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
