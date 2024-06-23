import styles from "./Cart.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";
import { clearCart, getCart } from "./cartSlice";

import LinkButton from "../ui/LinkButton";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../ui/Button";

function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={styles.cart}>
      <LinkButton>&larr; Back to menu</LinkButton>
      <h2>Your cart, {username}</h2>
      <ul>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div>
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="clear" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
