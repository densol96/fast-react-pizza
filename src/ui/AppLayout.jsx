import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import IsLoadingSpinner from "./IsLoadingSpinner";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {isLoading && <IsLoadingSpinner />}
      <main className="mx-auto w-full max-w-3xl overflow-y-auto px-5">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
