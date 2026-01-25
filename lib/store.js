import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducer/productSlice';

export const store = configureStore({
  reducer: {
    data: productSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
