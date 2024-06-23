import { useFetcher } from "react-router-dom";
import { updateOrder } from "../services/apiRestaurant";

import Button from "../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div>
      <fetcher.Form method="PATCH">
        <Button type="primary" disabled={isSubmitting}>
          {!isSubmitting ? "Make priority" : "Loading..."}
        </Button>
      </fetcher.Form>
    </div>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
