import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Game } from "@/models/game";

interface CartState {
  showCart: boolean;
  cartItems: Game[];
}

const cartFromLocalStorage =
  typeof localStorage !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];

const initialState: CartState = {
  showCart: false,
  cartItems: cartFromLocalStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItemToCart: (state, action: PayloadAction<Game>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem.quantity = newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const updatedState = state.cartItems.filter((item) => item._id !== itemId);
      state.cartItems.splice(0, state.cartItems.length, ...updatedState);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { toggleCart, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
