import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const cartPro = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const calculateTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
// ================= ASYNC THUNKS =================








// ================= INITIAL STATE =================

const initialState = {
    cart: cartPro,
    Price : calculateTotal(cartPro),
    showCart: false,
    loading: false,
    error: null,
};

// ================= SLICE =================

const cartSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const selectedProduct = state.cart.find(index => index.id === action.payload.id)
            if (selectedProduct) {
                selectedProduct.quantity += 1;
            }
            else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
             state.Price = calculateTotal(state.cart);
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        handleCart: (state) => {
            state.showCart = !state.showCart;
        },

        inc: (state, action) => {
            const item = state.cart.find(
                (product) => product.id === action.payload.id
            );

            if (item) {
                item.quantity += 1;
            }
             state.Price = calculateTotal(state.cart);
             
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        dec: (state, action) => {
            const item = state.cart.find(
                (product) => product.id === action.payload.id
            );

            if (!item) return;

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter(
                    (product) => product.id !== action.payload.id
                );
            }
             state.Price = calculateTotal(state.cart);
            
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        deleteFromCart : (state, action) => {
            state.cart = state.cart.filter(index => index.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify(state.cart)); 
             state.Price = calculateTotal(state.cart);

        }

    },

    extraReducers: (builder) => {
        builder

    }
});
export const { addToCart, handleCart, inc, dec,deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
