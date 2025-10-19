// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import productsReducer from "./productslice";
import cartReducer from "./cartslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
