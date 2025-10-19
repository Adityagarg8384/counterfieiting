import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currency: "₹",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload || [];
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { setProducts, clearProducts, setCurrency } = productsSlice.actions;
export default productsSlice.reducer;