import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= ASYNC THUNKS =================

 

 




// ================= INITIAL STATE =================

const initialState = {
     cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
   
   
    loading: false,
    error: null,
};

// ================= SLICE =================

const cartSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addToCart : (state,action) => {
            const selectedProduct = state.cart.find(index => index.id === action.payload.id)
            if(selectedProduct){
                selectedProduct.quantity += 1;
            }
            else{
                state.cart.push({...action.payload,quantity : 1})
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        }
    },
    extraReducers: (builder) => {
        builder
 
    }
});

export default cartSlice.reducer;
