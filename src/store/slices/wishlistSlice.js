import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "apnafurniture_wishlist";

const loadWishlist = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveWishlist = (wishlist) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => String(item.id) !== String(product.id)
        );
      } else {
        state.items.push(product);
      }

      saveWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist(state.items);
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
