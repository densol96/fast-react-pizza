import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import readressingSlice from "./features/protecting/readressingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    readressing: readressingSlice,
  },
});

export default store;
