import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducer/productSlice';
import cartSlice from './reducer/cartSlice';
export const store = configureStore({
  reducer: {
    data: productSlice,
    cart: cartSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
