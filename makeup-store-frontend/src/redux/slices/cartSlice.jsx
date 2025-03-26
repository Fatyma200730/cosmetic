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
      const existingProduct = state.items.find(item => item.product_id === productId);

      if (existingProduct) {
        state.totalQuantity -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.items = state.items.filter(item => item.product_id !== productId);
      }
    },

    resetCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    setCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    }
  },
});

export const { addToCart, removeFromCart, resetCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
