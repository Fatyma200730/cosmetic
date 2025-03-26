import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Assure-toi que le chemin est correct
import cartReducer from './slices/cartSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
});

export default store;
