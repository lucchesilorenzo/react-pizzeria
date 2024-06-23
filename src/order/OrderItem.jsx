import styles from "./OrderItem.module.css";

import { formatCurrency } from "../utils/helpers";

function OrderItem({ item, ingredients, isLoadingIngredients }) {
  const { quantity, name, unitPrice } = item;
  const totalPrice = quantity * unitPrice;

  return (
    <li className={styles.orderItem}>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <p>{!isLoadingIngredients ? ingredients.join(", ") : "Loading..."}</p>
    </li>
  );
}

export default OrderItem;
