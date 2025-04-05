// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.product_id === product.product_id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.items.push({ ...product });
      }

      state.totalQuantity += product.quantity;
      state.totalPrice += product.price * product.quantity;
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product_id !== productId);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.product_id === productId);

      if (existingProduct) {
        existingProduct.quantity = quantity;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },

    resetCart(state) {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
