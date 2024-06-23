import styles from "./Order.module.css";

import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { getOrder } from "../services/apiRestaurant";
import { formatDate, formatCurrency, calcTimeLeft } from "../utils/helpers";

import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    estimatedDelivery,
    cart,
    orderPrice,
    priority,
    priorityPrice,
  } = order;

  const isDelivered = calcTimeLeft(estimatedDelivery) <= 0;

  return (
    <div className={styles.order}>
      <div>
        <h2>Order #{id}</h2>
        <div className={styles.orderInfoWrapper}>
          {priority && <span className={styles.priority}>Priority</span>}
          <span className={styles.preparingOrder}>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {!isDelivered
            ? `Only ${calcTimeLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
          />
        ))}
      </ul>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className={styles.deliveryInfo}>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
