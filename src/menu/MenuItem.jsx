import styles from "./MenuItem.module.css";

import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  getTotalQuantityById,
  increaseItemQuantity,
} from "../cart/cartSlice";

import Button from "../ui/Button";

function MenuItem({ item }) {
  const { id, imageUrl, name, ingredients, unitPrice, soldOut } = item;

  const pizzaQuantity = useSelector(getTotalQuantityById(id));
  const isInCart = pizzaQuantity > 0;
  const dispatch = useDispatch();

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className={styles.menuItem}>
      <img
        src={imageUrl}
        alt={name}
        className={soldOut ? styles.soldOut : ""}
      />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div>
          <p>{!soldOut ? formatCurrency(unitPrice) : "Sold out"}</p>

          {isInCart && (
            <>
              <Button
                type="small"
                onClick={() => dispatch(decreaseItemQuantity(id))}
              >
                -
              </Button>
              <span>{pizzaQuantity}</span>
              <Button
                type="small"
                onClick={() => dispatch(increaseItemQuantity(id))}
              >
                +
              </Button>

              <Button type="secondary" onClick={() => dispatch(deleteItem(id))}>
                Delete
              </Button>
            </>
          )}

          {!soldOut && !isInCart && (
            <Button type="secondary" onClick={handleAddItem}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
