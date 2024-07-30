import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form className="text-right" method="PATCH">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}
