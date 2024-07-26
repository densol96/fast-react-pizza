import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import IsLoadingSpinner from "./IsLoadingSpinner";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <IsLoadingSpinner />}
      <Header />
      <main className="mx-auto max-w-3xl overflow-y-auto">
        <h1>Content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
