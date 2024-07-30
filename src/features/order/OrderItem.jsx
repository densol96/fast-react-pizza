import { formatCurrency } from "../../utilities/helpers";
import UpdateOrder from "./UpdateOrder";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="px-2 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
