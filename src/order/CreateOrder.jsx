import styles from "./CreateOrder.module.css";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { formatCurrency, isValidPhone } from "../utils/helpers";
import { getUsername } from "../user/userSlice";
import { createOrder } from "../services/apiRestaurant";

import EmptyCart from "../cart/EmptyCart";
import Button from "../ui/Button";
import store from "../store";

function CreateOrder() {
  const [orderWithPriority, setOrderWithPriority] = useState(false);

  const errors = useActionData();

  const totalPrice = useSelector(getTotalPrice);
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);

  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={styles.createOrder}>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First name</label>
          <input type="text" name="customer" defaultValue={username} required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {errors?.phone && <p>{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <input type="text" name="address" required />
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            value={orderWithPriority}
            onChange={(e) => setOrderWithPriority(e.target.checked)}
          />
          <label>Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {!isSubmitting
              ? `Order now for ${formatCurrency(totalPrice)}`
              : "Preparing..."}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(data.phone))
    errors.phone = "Please enter a valid phone number";

  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
