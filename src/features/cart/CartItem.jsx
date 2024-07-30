import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  return (
    <li className="items-center justify-between py-3 md:flex">
      <p className="mb-1 font-bold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-5">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
