import { useDispatch, useSelector } from "react-redux";

import { formatCurrency } from "../../utilities/helpers";

import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import { addItem } from "../cart/cartSlice";
import { getCurrentQuantityById, deleteItem } from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";
function MenuItem({ pizza }) {
  const {
    id: pizzaId,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;

  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(
      addItem({
        pizzaId,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const isInCart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-end justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
          {isInCart && (
            <div className="flex gap-3 sm:gap-8">
              <UpdateQuantity pizzaId={pizzaId} />
              <DeleteItem pizzaId={pizzaId} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
