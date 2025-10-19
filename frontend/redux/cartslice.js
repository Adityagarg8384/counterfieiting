// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { [productId]: quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) delete state.items[id];
      else state.items[id] = quantity;
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    setCartItems: (state, action) => {
      state.items = action.payload || {};
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  setCartItems,
  clearCart,
} = cartSlice.actions;

// --- Selectors ---
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) => {
  return Object.values(state.cart.items || {}).reduce((a, b) => a + b, 0);
};

export const selectCartAmount = (state) => {
  const { items } = state.cart;
  const { products } = state.products;
  let total = 0;
  for (const id in items) {
    const product = products.find((p) => p._id === id);
    if (product) total += (product.offerPrice ?? 0) * items[id];
  }
  return Math.floor(total * 100) / 100;
};

export default cartSlice.reducer;
