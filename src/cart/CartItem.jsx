import styles from "./CartItem.module.css";

import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import {
  decreaseItemQuantity,
  deleteItem,
  getTotalQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

import Button from "../ui/Button";

function CartItem({ item }) {
  const { pizzaId, quantity, name, unitPrice } = item;

  const pizzaQuantity = useSelector(getTotalQuantityById(pizzaId));
  const totalPricePerItem = pizzaQuantity * unitPrice;
  const dispatch = useDispatch();

  return (
    <li className={styles.cartItem}>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPricePerItem)}</p>
        <Button
          type="small"
          onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        >
          -
        </Button>
        <span>{pizzaQuantity}</span>
        <Button
          type="small"
          onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        >
          +
        </Button>
        <Button type="secondary" onClick={() => dispatch(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
