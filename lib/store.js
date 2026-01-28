import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducer/productSlice';
import cartSlice from './reducer/cartSlice';
import wishListSlice from './reducer/wishListSlice';
export const store = configureStore({
  reducer: {
    data: productSlice,
    cart: cartSlice,
    like: wishListSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});
