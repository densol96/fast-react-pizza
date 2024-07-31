import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderDropDown({ hideDropDown, forDisplay }) {
  const orders = useSelector((state) => state.cart.madeOrders);
  return (
    <div className="absolute right-0 top-[100%] pt-2">
      <ul
        onMouseLeave={hideDropDown}
        className={`border-3 ${forDisplay ? "" : "hidden"} max-h-40 w-52 divide-y-8 divide-yellow-400 overflow-y-auto rounded-lg border-solid bg-yellow-400 px-3 py-3 backdrop:border-white`}
      >
        {orders.length === 0 && (
          <p className="flex justify-center rounded-sm bg-yellow-100 px-3 py-3 text-center text-sm capitalize">
            {`No ordered items :(`}
          </p>
        )}
        {orders.map((order) => (
          <li
            key={order}
            className="flex justify-center rounded-sm bg-yellow-100 px-3 py-3"
          >
            <Link
              className="underline hover:cursor-pointer hover:no-underline"
              to="/app/order/9K8KG5"
            >
              #{order}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDropDown;
