import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // item already exist?
      const item = state.cart.find(
        (i) => String(i.id) === String(action.payload.id)
      );
      if (item) {
        item.quantity += 1; // increase quantity
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (i) => String(i.id) !== String(action.payload)
      );
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (i) => String(i.id) === String(action.payload)
      );
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(
          (i) => String(i.id) !== String(action.payload)
        );
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
