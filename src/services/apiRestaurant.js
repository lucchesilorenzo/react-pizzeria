const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  try {
    const res = await fetch(`${API_URL}/menu`);

    if (!res.ok) throw new Error("Something went wrong with getting menu");

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getOrder(id) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`);

    if (!res.ok) throw new Error("Something went wrong with getting the order");

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error("Something went wrong with creating a new order");

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateOrder(id, order) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error("Something went wrong with updating the order");
  } catch (err) {
    console.log(err);
  }
}
