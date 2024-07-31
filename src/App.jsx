import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import ProtectedRoute from "./features/protecting/ProtectedRoute";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/app",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="menu" />,
          },
          {
            path: "menu",
            element: <Menu />,
            loader: menuLoader,
            errorElement: <Error />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "order/new",
            element: <CreateOrder />,
            action: createOrderAction,
          },
          {
            path: "order/:orderId",
            element: <Order />,
            loader: orderLoader,
            errorElement: <Error />,
            action: updateOrderAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const orders = useSelector((state) => state.cart.madeOrders);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.setItem("username", username);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("orders", JSON.stringify(orders));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, cart, orders]);

  return <RouterProvider router={router} />;
}

export default App;
