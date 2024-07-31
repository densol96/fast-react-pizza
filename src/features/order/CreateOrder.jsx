import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../services/apiRestaurant";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const user = useSelector((state) => state.user);
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = user;
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length == 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">{`Ready to order? Let's go!`}</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <input className="input" type="tel" name="phone" required />
        </div>
        {formErrors?.phone && (
          <p className="mb-5 text-center text-red-500">{formErrors.phone}</p>
        )}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <input
            disabled={isLoadingAddress}
            className="input"
            type="text"
            name="address"
            defaultValue={address}
            required
          />
          {!position.latitude && (
            <span className="z-50md:right-0 absolute bottom-[3px] right-0.5 sm:bottom-auto">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoadingAddress ? "One second..." : "Get position"}
              </Button>
            </span>
          )}
        </div>
        {addressStatus === "error" && (
          <p className="mb-5 text-center text-red-500">{errorAddress}</p>
        )}

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order.."
              : `Order now for ${formatCurrency(totalPrice)}`}
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
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const createdOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/app/order/${createdOrder.id}`);
}

export default CreateOrder;
