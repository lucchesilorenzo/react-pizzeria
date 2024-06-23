import styles from "./EmptyCart.module.css";

import LinkButton from "../ui/LinkButton";

function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p>Your cart is still empty. Start adding some pizzas 🍕</p>
    </div>
  );
}

export default EmptyCart;
