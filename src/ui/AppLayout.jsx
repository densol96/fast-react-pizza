import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import IsLoadingSpinner from "./IsLoadingSpinner";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isReadressing = useSelector((state) => state.readressing.readressing);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {(isLoading || isReadressing) && <IsLoadingSpinner />}
      <main className="mx-auto w-full max-w-3xl overflow-y-auto px-5">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
