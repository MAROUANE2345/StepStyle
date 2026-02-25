import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= ASYNC THUNK =================


export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (
        {name,email,city,phone,address,totalPrice,orderInfo},
        thunkAPI
    ) => {
        try {
            await axios.post(
                "https://69733ee0b5f46f8b58269eb8.mockapi.io/order",
                {
                    name,
                    email,
                    city,
                    phone,
                    address,
                    totalPrice,
                    orderInfo,
                }
            );
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);
 





// ================= INITIAL STATE =================

const initialState = {
  loading: false,
  success: false,
  error: null,
};

// ================= SLICE =================

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
      
  },

  extraReducers: (builder) => {
    builder
    
     
  },
});



export default orderSlice.reducer;
