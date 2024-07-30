import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const pizzasTotal = useSelector(getTotalCartQuantity);
  const pizzasTotalPrice = useSelector(getTotalCartPrice);
  if (!pizzasTotal) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{pizzasTotal} pizzas</span>
        <span>{formatCurrency(pizzasTotalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
