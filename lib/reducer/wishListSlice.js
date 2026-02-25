import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const wishList = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];
 
// ================= ASYNC THUNKS =================








// ================= INITIAL STATE =================

const initialState = {
    Liked: wishList,
     
    showCart: false,
    loading: false,
    error: null,
};

// ================= SLICE =================

const wishListSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
      addToWishList: (state, action) => {
          const LikedProduct = state.Liked.find(index => index.id === action.payload.id)
          if(!LikedProduct ){
                state.Liked.push(action.payload);
          }
            localStorage.setItem("wishList", JSON.stringify(state.Liked))
      },

        deleteFromLiked: (state, action) => {
            state.Liked = state.Liked.filter(index => index.id !== action.payload);
            localStorage.setItem("wishList", JSON.stringify(state.Liked))
        },

    },

    extraReducers: (builder) => {
        builder

    }
});
export const { addToWishList , deleteFromLiked} = wishListSlice.actions;

export default wishListSlice.reducer;